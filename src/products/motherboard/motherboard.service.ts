import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotherboardDto } from './dto/motherboard.dto';
import { Motherboard } from './motherboard.model';

@Injectable()
export class MotherboardService {
  @InjectRepository(Motherboard)
  private motherboardRepository: Repository<Motherboard>;

  findAll(): Promise<Motherboard[]> {
    return this.motherboardRepository.find();
  }

  async findOneById(id: number): Promise<Motherboard | null> {
    const motherboard = await this.motherboardRepository.findOneBy({
      id,
    });
    if (!motherboard) {
      throw new HttpException('Motherboard not found', HttpStatus.NOT_FOUND);
    }
    return motherboard;
  }

  async create(motherboardDto: MotherboardDto): Promise<Motherboard | never> {
    const { brand, model } = motherboardDto;

    const existingMotherboardTraits = await this.motherboardRepository
      .createQueryBuilder('Motherboard')
      .select(['Motherboard.traitsBrand', 'Motherboard.traitsModel'])
      .where('Motherboard.traitsBrand = :brand', { brand: brand })
      .andWhere('Motherboard.traitsModel = :model', { model: model })
      .execute();

    if (existingMotherboardTraits.length != 0) {
      throw new HttpException(
        'Already existing motherboard',
        HttpStatus.CONFLICT,
      );
    }

    const motherboard = Motherboard.createFromDto(motherboardDto);

    return this.motherboardRepository.save(motherboard);
  }

  async update(id: number, motherboardDto: MotherboardDto) {
    const motherboardExists: Motherboard =
      await this.motherboardRepository.findOne({
        where: { id },
      });

    if (!motherboardExists) {
      throw new HttpException(
        'Motherboard with id: ' + id + ' doesn`t exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const motherboard = Motherboard.createFromDto(motherboardDto);

    await this.motherboardRepository.update(id, motherboard);

    return await this.findOneById(id);
  }

  async remove(id: number): Promise<Motherboard | never> {
    const motherboard: Motherboard = await this.findOneById(id);

    if (!motherboard) {
      throw new HttpException(
        'Motherboard doesn`t exist',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.motherboardRepository.delete(id);
    return motherboard;
  }
}
