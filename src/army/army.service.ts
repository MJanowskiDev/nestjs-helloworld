import { Injectable } from '@nestjs/common';
import { Soldier } from './interfaces/soldier.interface';

@Injectable()
export class ArmyService {
  private readonly army: Soldier[] = [];

  create(soldier: Soldier) {
    this.army.push(soldier);
  }

  findAll(): Soldier[] {
    return this.army;
  }
}
