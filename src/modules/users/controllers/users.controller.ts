import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'config/prisma.service';
import {
  CreateUserSchema,
  type CreateUserDTO,
} from 'modules/users/dtos/create-user.dto';
import { CreateUserUseCase } from '../domain/use-cases/create-user.use-case';
import { PrismaUserRepository } from '../infra/prisma/prisma-user.repository';

@Controller('users')
export class UsersController {
  private createUserUseCase = new CreateUserUseCase(
    new PrismaUserRepository(new PrismaService()),
  );

  @Post()
  async create(
    @Body() body: unknown,
  ): Promise<Omit<CreateUserDTO, 'password'> & { id: string }> {
    const result = CreateUserSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }

    const user = await this.createUserUseCase.execute(result.data);

    // Nunca devolve a senha 😬
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
