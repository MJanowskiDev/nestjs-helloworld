import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FunctionalLoggerMiddleware } from './common/middleware/functional-logger/functional-logger.middleware';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(FunctionalLoggerMiddleware);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
