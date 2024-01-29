import { Module } from '@nestjs/common';
import { MotherboardModule } from './motherboard/motherboard.module';

@Module({
  imports: [MotherboardModule]
})
export class ProductsModule {}
