import { UserRepository } from '../user.repository';
import { User } from '../user.entity';
import { randomUUID } from 'crypto';

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const user = new User(randomUUID(), name, email, password);
    return this.userRepo.create(user);
  }
}
