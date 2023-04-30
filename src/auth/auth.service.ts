import { User } from '@/user/user.model';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';
import { LoginDto, RegisterDto } from './dto';

@Injectable({})
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { firstName, email, password }: RegisterDto = body;
    let user: User = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Already existing user', HttpStatus.CONFLICT)
    }

    user = new User();

    user.firstName = firstName;
    user.email = email;
    user.hash = this.helper.encodePassword(password);

    return this.userRepository.save(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.userRepository.findOne({ where: { email } });

    if(!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.hash);

    if(!isPasswordValid) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }

}
