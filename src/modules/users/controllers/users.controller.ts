import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../domain/use-cases/create-user.use-case';
import { PrismaUserRepository } from '../infra/prisma/prisma-user.repository';

@Controller('users')
export class UsersController {
  private createUserUseCase = new CreateUserUseCase(new PrismaUserRepository());

  @Post()
  async create(@Body() body: any) {
    const user = await this.createUserUseCase.execute(
      body.name,
      body.email,
      body.password,
    );
    return user;
  }
}
