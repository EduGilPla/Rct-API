import { 
  ClassSerializerInterceptor, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  HttpStatus, 
  Inject, 
  Param, 
  UseGuards, 
  UseInterceptors 
} from "@nestjs/common";
import { IsAdminGuard } from "../guards/isAdmin.guard";
import { ValidJwtGuard } from "../guards/validJwt.guard";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(ValidJwtGuard, IsAdminGuard)
  findAll(){
    return this.userService.findAll();
  }

  @Delete('remove/:id')
  deleteUser(@Param('id') id: string){
    return this.userService.remove(parseInt(id))
  }
}