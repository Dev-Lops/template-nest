/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'config/env';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Habilitar CORS corretamente para FlutterFlow e consumo externo
  app.enableCors({
    origin: '*', // Permite acesso de qualquer domínio (ideal para dev)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Converte automaticamente valores
      transformOptions: { enableImplicitConversion: true },
      validateCustomDecorators: true,
    }),
  );

  // 🔹 Configuração do Swagger para Documentação
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API modelo')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Insira o token JWT aqui para acessar endpoints protegidos.',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const PORT = env.PORT || 3333;
  await app.listen(PORT, '0.0.0.0');
  console.log(
    `Server running on port http://localhost:${PORT} acess api docs in http://localhost:${PORT}/docs`,
  );
}

bootstrap().catch((err) => console.error(err));
