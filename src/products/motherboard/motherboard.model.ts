import { Column, Entity } from "typeorm";
import { definingTraits } from "../common/traits.attribute";
import { MotherboardFormat } from "./enums/format.enum";
import { MemoryType } from "./enums/memoryType.enum";

@Entity()
export class Motherboard {
  @Column(() => definingTraits)
  private traits: definingTraits;
  @Column()
  private format: MotherboardFormat
  @Column()
  private cpuSocket: string
  @Column()
  private memoryType: MemoryType
  @Column()
  private memorySockets: number
  @Column()
  private graphicsSocket: string
  
  private constructor(
    traits: definingTraits, 
    format: MotherboardFormat,
    cpuSocket: string,
    memoryType: MemoryType,
    memorySockets: number,
    graphicsSocket: string
    ){
      this.traits = traits,
      this.format = format,
      this.cpuSocket = cpuSocket,
      this.memoryType = memoryType,
      this.memorySockets = memorySockets,
      this.graphicsSocket = graphicsSocket
  }

  public create(
    traits: definingTraits, 
    format: MotherboardFormat,
    cpuSocket: string,
    memoryType: MemoryType,
    memorySockets: number,
    graphicsSocket: string
  ) {
    return new Motherboard(traits, format, cpuSocket, memoryType, memorySockets, graphicsSocket)
  }
}