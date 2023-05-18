import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Brand } from "../brands/brands.enum";
import { definingTraits } from "../common/traits.attribute";
import { MotherboardDto } from "./dto/motherboard.dto";
import { MotherboardFormat } from "./enums/format.enum";
import { MemoryType } from "./enums/memoryType.enum";
import { Motherboard } from "./motherboard.model";

@Injectable()
export class MotherboardService {
  @InjectRepository(Motherboard) 
  private motherboardRepository: Repository<Motherboard>

  findAll(): Promise<Motherboard[]> {
    return this.motherboardRepository.find();
  }

  findOneById(id: number): Promise<Motherboard | null> {
    return this.motherboardRepository.findOneBy({ id });
  }

  async create(body: MotherboardDto): Promise<Motherboard | never>{
    const {
      brand,
      model,
      price,
      format,
      cpuSocket,
      memoryType,
      memorySockets,
      graphicsSocket
    }: MotherboardDto = body
    const formattedFormat = <MotherboardFormat>format 
    const formattedMemoryType = <MemoryType>memoryType
    const formattedBrand = <Brand>brand
    const traits = definingTraits.create(formattedBrand, model, price)
    let motherboard: Motherboard = await this.motherboardRepository.findOne({ where: { traits } })

    if(motherboard) {
      throw new HttpException('Already existing motherboard', HttpStatus.CONFLICT)
    }
    motherboard = Motherboard.create(traits,formattedFormat,cpuSocket,formattedMemoryType,memorySockets,graphicsSocket)

    return this.motherboardRepository.save(motherboard);
  }

  async remove(id: number): Promise<Motherboard | never> {
    const motherboard: Motherboard = await this.findOneById(id)

    if(!motherboard){
      throw new HttpException('Motherboard doesn´t exist', HttpStatus.NOT_FOUND)
    }    
    await this.motherboardRepository.delete(id);
    return motherboard;
  }
}