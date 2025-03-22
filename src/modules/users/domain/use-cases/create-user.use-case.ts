import * as bcrypt from 'bcryptjs';

import { randomUUID } from 'crypto';
import { EmailAlreadyExistsException } from '../../../../core/exceptions/email-already-exists.exception';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const userAlreadyExists = await this.userRepo.findByEmail(email);

    if (userAlreadyExists) {
      throw new EmailAlreadyExistsException();
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User(randomUUID(), name, email, hashedPassword);
    return this.userRepo.create(user);
  }
}
