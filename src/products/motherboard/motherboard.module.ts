import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotherboardController } from './motherboard.controller';
import { Motherboard } from './motherboard.model';
import { MotherboardService } from './motherboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Motherboard])],
  providers: [MotherboardService],
  controllers: [MotherboardController],
})
export class MotherboardModule {}
