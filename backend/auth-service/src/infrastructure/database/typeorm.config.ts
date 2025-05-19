import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/entities/user.entity';

export const DatabaseModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: 'postgres',
  password: 'postgres',
  database: 'authdb',
  entities: [UserEntity],
  synchronize: true,
});
