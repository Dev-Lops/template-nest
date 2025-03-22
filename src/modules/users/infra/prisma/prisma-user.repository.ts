import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService = new PrismaService()) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: { ...user },
    });
    return new User(created.id, created.name, created.email, created.password);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user
      ? new User(user.id, user.name, user.email, user.password)
      : null;
  }
}
