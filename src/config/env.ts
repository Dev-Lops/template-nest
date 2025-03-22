/* eslint-disable @typescript-eslint/no-unsafe-call */
import { config } from 'dotenv';
import { z } from 'zod';

config(); // Carrega as variáveis do .env

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.string().regex(/^\d+$/).transform(Number).default('3333'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(10, 'JWT_SECRET muito curto'),
  JWT_EXPIRES_IN: z.string().default('1h'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    '❌ Erro na validação das variáveis de ambiente',
    _env.error.format(),
  );
  throw new Error('Variáveis de ambiente inválidas');
}

export const env = _env.data;
