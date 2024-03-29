import { User } from './user/user.model';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token);
  }

  //Buscar usuario por el ID que conseguimos en el decode
  public async validateUser(decoded: any): Promise<User> {
    return this.userRepository.findOne(decoded.id);
  }

  public async generateToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    return await this.jwt.signAsync(payload);
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync();

    return bcrypt.hashSync(password, salt);
  }

  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
