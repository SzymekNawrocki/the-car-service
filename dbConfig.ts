import { Car } from 'src/cars/entity/car.entity';
import { User } from 'src/users/entity/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  url: 'postgresql://neondb_owner:JpKjGCSH9Nn4@ep-wandering-dust-a2mkxd26.eu-central-1.aws.neon.tech/neondb?sslmode=require',
  type: 'postgres',
  port: 3306,
  entities: [Car, User],
  synchronize:true
};
