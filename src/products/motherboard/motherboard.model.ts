import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DefiningTraits } from '../common/traits.attribute';
import { MotherboardDto } from './dto/motherboard.dto';
import { MotherboardFormat } from './enums/format.enum';
import { MemoryType } from './enums/memoryType.enum';

@Entity()
export class Motherboard {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column(() => DefiningTraits)
  private traits: DefiningTraits;
  @Column()
  private format: MotherboardFormat;
  @Column()
  private cpuSocket: string;
  @Column()
  private memoryType: MemoryType;
  @Column()
  private memorySockets: number;
  @Column()
  private graphicsSocket: string;

  private constructor(
    traits: DefiningTraits,
    format: MotherboardFormat,
    cpuSocket: string,
    memoryType: MemoryType,
    memorySockets: number,
    graphicsSocket: string,
  ) {
    (this.traits = traits),
      (this.format = format),
      (this.cpuSocket = cpuSocket),
      (this.memoryType = memoryType),
      (this.memorySockets = memorySockets),
      (this.graphicsSocket = graphicsSocket);
  }

  public static create(
    brand: string,
    model: string,
    price: number,
    format: string,
    cpuSocket: string,
    memoryType: string,
    memorySockets: number,
    graphicsSocket: string,
  ): Motherboard {
    const castedToEnumFormat = <MotherboardFormat>format;
    const castedToEnumMemoryType = <MemoryType>memoryType;
    const traits = DefiningTraits.create(brand, model, price);
    return new Motherboard(
      traits,
      castedToEnumFormat,
      cpuSocket,
      castedToEnumMemoryType,
      memorySockets,
      graphicsSocket,
    );
  }

  public static createFromDto(dto: MotherboardDto) {
    const {
      brand,
      model,
      price,
      format,
      cpuSocket,
      memoryType,
      memorySockets,
      graphicsSocket,
    } = dto;
    return Motherboard.create(
      brand,
      model,
      price,
      format,
      cpuSocket,
      memoryType,
      memorySockets,
      graphicsSocket,
    );
  }
}
