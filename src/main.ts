import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './error/http-exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
