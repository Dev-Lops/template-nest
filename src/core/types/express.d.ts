// src/core/types/express.d.ts

export {};

declare global {
  namespace Express {
    interface User {
      sub: string;
      email: string;
      role?: 'admin' | 'user'; // Se quiser adicionar mais coisas aqui
    }
  }
}
