import { Module } from '@nestjs/common';
import { AuthController } from 'modules/auth/controllers/auth.controller';
import { UsersController } from './modules/users/controllers/users.controller';

@Module({
  imports: [],
  controllers: [UsersController, AuthController],
  providers: [],
})
export class AppModule {}
