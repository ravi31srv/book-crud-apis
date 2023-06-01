import * as dotenv from 'dotenv';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Book-App')
    .setDescription('Book-App API Description.')
    .setVersion('1.0')
    .addTag('Books')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Doc', app, document);

  /* In case when required to apply Guards & Filters globaly 
  app.useGlobalFilters(new AllExceptionFilter(adapter));
  app.useGlobalGuards(new AuthGuard(app.get(JwtService))); 
  */

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, () => {
    console.log('Server started......');
  });
}
bootstrap();
