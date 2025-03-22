// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from 'config/auth/auth.service';
import { PrismaService } from 'config/prisma.service';
import { AuthController } from 'modules/auth/controllers/auth.controller';
import { JwtStrategy } from '../../core/strategies/jwt.strategy';
import { PrismaUserRepository } from '../users/infra/prisma/prisma-user.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaUserRepository,
    PrismaService,
    JwtStrategy,
  ],
})
export class AuthModule {}
