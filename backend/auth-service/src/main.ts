import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedUsers } from './infrastructure/seed/user.seeder';
import { UserEntity } from './domain/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Inicializamos TypeORM manualmente
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [UserEntity],
    synchronize: true,
  });

  await dataSource.initialize();
  await seedUsers(dataSource); // ✅ Aquí se ejecuta correctamente

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
