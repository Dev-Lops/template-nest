/* eslint-disable @typescript-eslint/no-floating-promises */
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { CreateUserUseCase } from './create-user.use-case';

class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user); // Simula a persistência adicionando ao array
    return Promise.resolve(user); // ou usa await em algo real
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return Promise.resolve(user ?? null); // mesma coisa aqui
  }
}

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepo: InMemoryUserRepository;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    useCase = new CreateUserUseCase(userRepo);
  });

  it('deve criar um novo usuário com senha hasheada', async () => {
    const name = 'Anderson';
    const email = 'anderson@example.com';
    const password = '123456';

    const user = await useCase.execute({ name, email, password });

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password); // Senha deve estar hasheada
  });

  it('deve lançar erro se já existir usuário com mesmo e-mail', async () => {
    const userData = {
      name: 'Anderson',
      email: 'anderson@example.com',
      password: '123456',
    };
    await useCase.execute(userData);

    const existingUser = await userRepo.findByEmail(userData.email);
    expect(existingUser).not.toBeNull();
    expect(() => useCase.execute(userData)).rejects.toThrow(
      'E-mail já cadastrado',
    );
  });
});
