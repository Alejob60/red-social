import { DataSource } from 'typeorm';
import { UserEntity } from '../domain/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'auth-db',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'auth_db',
  entities: [UserEntity],
  synchronize: true, // Solo en desarrollo. En producción, usar migraciones.
});
