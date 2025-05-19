import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/jwt/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/jwt/jwt-auth.guard';
import { UserTypeOrmRepository } from './infrastructure/database/user.typeorm.repository';
import { UserController } from './interfaces/controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'auth-db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'authdb',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserTypeOrmRepository, JwtStrategy, JwtAuthGuard],
})
export class AppModule {}
