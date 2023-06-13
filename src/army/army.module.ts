import { Global, Module } from '@nestjs/common';
import { ArmyController } from './army.controller';
import { ArmyService } from './army.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Global() //global modules can be registered only once
@Module({
  controllers: [ArmyController],
  providers: [
    ArmyService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [ArmyService],
})
export class ArmyModule {}
