import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MotherboardModule } from './motherboard/motherboard.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, MotherboardModule, AuthModule, PrismaModule],
})
export class AppModule {}
