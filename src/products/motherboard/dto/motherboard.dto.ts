import { Brand } from "../../brands/brands.enum";
import { Trim } from "class-sanitizer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MotherboardFormat } from "../enums/format.enum";
import { MemoryType } from "../enums/memoryType.enum";

export class MotherboardDto {
  @Trim()
  @IsString()
  @IsEnum(Brand)
  @IsNotEmpty()
  brand: string
  @Trim(" ")
  @IsString()
  @IsNotEmpty()
  model: string
  @IsNumber()
  price: number
  @IsString()
  @IsNotEmpty()
  @IsEnum(MotherboardFormat)
  format: string
  @IsString()
  @IsNotEmpty()
  cpuSocket: string
  @IsString()
  @IsNotEmpty()
  @IsEnum(MemoryType)
  memoryType: string
  @IsNumber()
  memorySockets: number
  @IsString()
  @IsNotEmpty()
  graphicsSocket: string
}