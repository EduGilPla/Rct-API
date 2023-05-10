import { ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, UseInterceptors } from "@nestjs/common";
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
}