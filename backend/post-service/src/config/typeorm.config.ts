import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { PostEntity } from '../domain/entities/post.entity';
import { LikeEntity } from '../domain/entities/like.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'social_post',
  synchronize: true,
  logging: true, 
  entities: [PostEntity, LikeEntity],
});
