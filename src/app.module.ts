import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { ArmyModule } from './army/army.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { FunctionalLoggerMiddleware } from './common/middleware/functional-logger/functional-logger.middleware';

@Module({
  imports: [ArmyModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, FunctionalLoggerMiddleware)
      .forRoutes({ path: '/army', method: RequestMethod.GET });
  }
}
