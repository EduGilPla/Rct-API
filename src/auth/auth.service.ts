import { User } from './user/user.model';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';
import { LoginDto, RegisterDto } from './dto';
import { Role } from './role/role.enum';

@Injectable({})
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { firstName, lastName ,email, password }: RegisterDto = body;
    let user: User = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Already existing user', HttpStatus.CONFLICT)
    }

    const DEFAULT_ROLE = Role.USER;
    user = new User(firstName, lastName, email, this.helper.encodePassword(password),DEFAULT_ROLE);

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
