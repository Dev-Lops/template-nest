// src/modules/auth/dtos/login.dto.ts
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
