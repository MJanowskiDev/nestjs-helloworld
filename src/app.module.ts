import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { ArmyModule } from './army/army.module';

@Module({
  imports: [ArmyModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
