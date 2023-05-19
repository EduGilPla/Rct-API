import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';
import { UserModule } from './auth/user/user.module';
import { MotherboardModule } from './products/motherboard/motherboard.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { getEnvPath } from './common/helper/env.helper';
import { ProductsModule } from './products/products.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    MotherboardModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    ProductsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
