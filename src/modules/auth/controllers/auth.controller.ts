// src/modules/auth/controllers/auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'config/env';
import { PrismaService } from 'config/prisma.service';
import { AuthenticateUserUseCase } from 'modules/auth/domain/use-case/authenticate-user.use-case';
import { PrismaUserRepository } from 'modules/users/infra/prisma/prisma-user.repository';
import { LoginDTO } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  private authenticateUserUseCase = new AuthenticateUserUseCase(
    new PrismaUserRepository(new PrismaService()),
    new JwtService({ secret: env.JWT_SECRET }),
  );

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authenticateUserUseCase.execute(body.email, body.password);
  }
}
