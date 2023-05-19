import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefiningTraits } from '../common/traits.attribute';
import { MotherboardDto } from './dto/motherboard.dto';
import { Motherboard } from './motherboard.model';

@Injectable()
export class MotherboardService {
  @InjectRepository(Motherboard)
  private motherboardRepository: Repository<Motherboard>;

  findAll(): Promise<Motherboard[]> {
    return this.motherboardRepository.find();
  }

  async findOneById(
    id: number,
  ): Promise<Motherboard | null> {
    const motherboard =
      await this.motherboardRepository.findOneBy({
        id,
      });
    if (!motherboard) {
      throw new HttpException(
        'Motherboard not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return motherboard;
  }

  async create(
    body: MotherboardDto,
  ): Promise<Motherboard | never> {
    const {
      brand,
      model,
      price,
      format,
      cpuSocket,
      memoryType,
      memorySockets,
      graphicsSocket,
    } = body;

    const traits = DefiningTraits.create(
      brand,
      model,
      price,
    );

    let motherboard: Motherboard =
      await this.motherboardRepository.findOne({
        where: { traits },
      });

    if (motherboard) {
      throw new HttpException(
        'Already existing motherboard',
        HttpStatus.CONFLICT,
      );
    }

    motherboard = Motherboard.create(
      traits,
      format,
      cpuSocket,
      memoryType,
      memorySockets,
      graphicsSocket,
    );

    return this.motherboardRepository.save(
      motherboard,
    );
  }

  async update(
    id: number,
    body: MotherboardDto
  ){
    const motherboardExists: Motherboard =
      await this.motherboardRepository.findOne({
        where: { id },
    });

    if (!motherboardExists) {
      throw new HttpException(
        'Motherboard with id: '+ id + ' doesn`t exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const {
      brand,
      model,
      price,
      format,
      cpuSocket,
      memoryType,
      memorySockets,
      graphicsSocket,
    } = body;

    const traits = DefiningTraits.create(
      brand,
      model,
      price,
    );

    const motherboard = Motherboard.create(
      traits,
      format,
      cpuSocket,
      memoryType,
      memorySockets,
      graphicsSocket,
    );

    await this.motherboardRepository.update(id, motherboard)

    return await this.findOneById(id);
  }

  async remove(
    id: number,
  ): Promise<Motherboard | never> {
    const motherboard: Motherboard =
      await this.findOneById(id);

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
