import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { JwtService } from '@nestjs/jwt';
import { UserTypeOrmRepository } from '../../infrastructure/database/user.typeorm.repository';

@Controller('auth')
export class AuthController {
  private readonly loginUseCase: LoginUseCase;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserTypeOrmRepository
  ) {
    this.loginUseCase = new LoginUseCase(userRepo, jwtService);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }
}
