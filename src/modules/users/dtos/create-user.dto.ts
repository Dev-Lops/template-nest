import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha muito curta'),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
