import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  
  async signup(dto: AuthDto) {
    return dto.email;
  }
  async signin(dto: AuthDto) {
    return dto.email;
  }
}
