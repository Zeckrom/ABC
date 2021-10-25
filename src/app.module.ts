import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ConfigService } from './config.service';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    CatsModule,
    AuthModule,
    UsersModule,
    EmployeesModule,
  ],
  controllers: [AppController]
})
export class AppModule { }
