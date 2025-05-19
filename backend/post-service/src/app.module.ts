import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './domain/entities/post.entity';
import { LikeEntity } from './domain/entities/like.entity';

import { PostController } from './interfaces/controllers/post.controller';

// Use Cases
import { CreatePostUseCase } from './application/use-cases/create-post.use-case';
import { ListPostsUseCase } from './application/use-cases/list-posts.use-case';
import { LikePostUseCase } from './application/use-cases/like-post.use-case';

// Repositories
import { PostRepositoryImpl } from './infrastructure/database/post.typeorm.repository';
import { LikeRepositoryImpl } from './infrastructure/database/like.typeorm.repository';

// Guards
import { JwtAuthGuard } from './infrastructure/jwt/jwt-auth.guard';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    // 👇 Agrega esta conexión a la base de datos (forRoot)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'social_post',
      synchronize: true, // Solo para desarrollo
      autoLoadEntities: true,
    }),

    // 👇 Registra las entidades que se usarán en este módulo
    TypeOrmModule.forFeature([PostEntity, LikeEntity]),
  ],
  controllers: [PostController],
  providers: [
    // Casos de uso
    CreatePostUseCase,
    ListPostsUseCase,
    LikePostUseCase,

    // Repositorios personalizados
    {
      provide: 'PostRepository',
      useClass: PostRepositoryImpl,
    },
    {
      provide: 'LikeRepository',
      useClass: LikeRepositoryImpl,
    },

    // Guard para autenticación JWT
    JwtAuthGuard,
  ],
})
export class AppModule {}
