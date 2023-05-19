import { User } from "./user/user.model";
import { 
  Body, 
  Controller, 
  Post, 
  UseInterceptors, 
  ClassSerializerInterceptor, 
  UseGuards, 
  Req, 
  HttpCode, 
  HttpStatus } from "@nestjs/common"
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";
import { Request } from 'express';

@Controller('auth')
export class AuthController{
  constructor(private readonly authService: AuthService){}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  refresh (@Req() { user }: Request): Promise<string | never> {
    return this.authService.refresh(<User>user)
  }
}