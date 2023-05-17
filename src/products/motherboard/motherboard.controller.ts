import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, UseInterceptors } from "@nestjs/common";
import { MotherboardDto } from "./dto/motherboard.dto";
import { MotherboardService } from "./motherboard.service";

@Controller('motherboard')
export class MotherboardController {
  @Inject(MotherboardService)
  private readonly motherboardService: MotherboardService

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(){
    return this.motherboardService.findAll();
  }

  @Post('create')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() dto: MotherboardDto){
    return this.motherboardService.create(dto);
  }

  @Delete('delete/:id')
  deleteMotherboard(@Param('id') id: number){
    return this.motherboardService.remove(id);
  }
}