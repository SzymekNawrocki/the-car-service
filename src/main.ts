import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
    }),
  );

 
  const config = new DocumentBuilder()
    .setTitle('API Documentation') 
    .setDescription('API for managing cars and users') 
    .setVersion('1.0') 
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document); 

  // Start serwera
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
