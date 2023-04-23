import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Las credenciales deben ser únicas',
          );
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    //find user by email
    const user = 
      await this.prisma.user.findFirst({
        where: {
          email: dto.email,
        },
    });
    if (!user) throw new NotFoundException(
      'El usuario no existe'
    );
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    if(!pwMatches) throw new ForbiddenException(
      'Contraseña incorrecta',
    );
    delete user.hash;
    return user;
  }
}
