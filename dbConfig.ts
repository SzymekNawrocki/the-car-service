import { Car } from 'src/cars/entity/car.entity';
import { User } from 'src/users/entity/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';

export const getPgConfig = (configService: ConfigService): PostgresConnectionOptions => ({
  url: configService.get<string>('DATABASE_URL'),
  type: 'postgres',
  entities: [Car, User],
  synchronize: true, 
});
