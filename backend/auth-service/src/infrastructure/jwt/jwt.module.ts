import { JwtModule } from '@nestjs/jwt';

export const JwtConfigModule = JwtModule.register({
  secret: process.env.JWT_SECRET || 'supersecret',
  signOptions: { expiresIn: '1d' },
});
