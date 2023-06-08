import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArmyController } from './army/army.controller';

@Module({
  imports: [],
  controllers: [AppController, ArmyController],
  providers: [AppService],
})
export class AppModule {}
