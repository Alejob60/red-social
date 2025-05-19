import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infrastructure/jwt/jwt-auth.guard';
import { GetMyProfileUseCase } from '../../application/use-cases/get-my-profile.use-case';
import { UserTypeOrmRepository } from '../../infrastructure/database/user.typeorm.repository';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repo: UserTypeOrmRepository,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    const useCase = new GetMyProfileUseCase(this.repo);
    return useCase.execute(req.user.sub);
  }
}
