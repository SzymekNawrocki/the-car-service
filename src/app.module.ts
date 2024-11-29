import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CarsService } from './cars/cars.service';
import { pgConfig } from 'dbConfig';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(pgConfig),
    UsersModule,
    CarsModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
