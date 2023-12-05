import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { MotherboardDto } from './dto/motherboard.dto';
import { MotherboardService } from './motherboard.service';

@Controller('motherboard')
@UseInterceptors(ClassSerializerInterceptor)
export class MotherboardController {
  @Inject(MotherboardService)
  private readonly motherboardService: MotherboardService;

  @Get('list')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.motherboardService.findAll();
  }

  @Post('create')
  createMotherboard(@Body() dto: MotherboardDto) {
    return this.motherboardService.create(dto);
  }

  @Get('read/:id')
  async readMotherboard(@Param('id') id: number) {
    return await this.motherboardService.findOneById(id);
  }

  @Put('update/:id')
  updateMotherboard(@Param('id') id: number, @Body() dto: MotherboardDto) {
    return this.motherboardService.update(id, dto);
  }

  @Delete('delete/:id')
  deleteMotherboard(@Param('id') id: number) {
    return this.motherboardService.remove(id);
  }
}
