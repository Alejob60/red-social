import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UserSeeder } from './seeds/user.seeder'; 
import { AppDataSource } from './config/typeorm.config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  try {
    const dataSource: DataSource = await AppDataSource.initialize();
    await new UserSeeder(dataSource).seed();
    console.log('Usuarios sembrados correctamente en la base de datos.');
  } catch (error) {
    console.error('Error inicializando base de datos o seeding de usuarios:', error);
  }

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`User-service corriendo en http://localhost:${port}`);
}

bootstrap();
