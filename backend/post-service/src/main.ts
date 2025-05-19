import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppDataSource } from './config/typeorm.config';
import { PostSeeder } from './infrastructure/seed/post.seeder';
import { DataSource } from 'typeorm';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para desarrollo local
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  try {
    const dataSource: DataSource = await AppDataSource.initialize();
    const seeder = new PostSeeder(dataSource);
    await seeder.seed();
    console.log(' Seeding completado');
  } catch (err) {
    console.error('Error inicializando la base de datos o seeder:', err);
  }

  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`🚀 Post-service corriendo en http://localhost:${port}`);
}

bootstrap();
