import { ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  @Get('list')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(){
    return this.userService.findAll();
  }

  @Delete('remove/:id')
  deleteUser(@Param('id') id: string){
    return this.userService.remove(parseInt(id))
  }
}