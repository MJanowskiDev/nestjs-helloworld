import { Global, Module } from '@nestjs/common';
import { ArmyController } from './army.controller';
import { ArmyService } from './army.service';

@Global() //global modules can be registered only once
@Module({
  controllers: [ArmyController],
  providers: [ArmyService],
  exports: [ArmyService],
})
export class ArmyModule {}
