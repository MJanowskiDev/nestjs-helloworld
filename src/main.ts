import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FunctionalLoggerMiddleware } from './common/middleware/functional-logger/functional-logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(FunctionalLoggerMiddleware);
  await app.listen(3000);
}
bootstrap();
