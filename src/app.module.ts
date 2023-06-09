import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArmyController } from './army/army.controller';
import { AdminController } from './admin/admin.controller';
import { ArmyService } from './army/army.service';

@Module({
  imports: [],
  controllers: [AppController, ArmyController, AdminController],
  providers: [AppService, ArmyService],
})
export class AppModule {}
