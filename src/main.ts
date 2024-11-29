import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'supersecretkey',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
