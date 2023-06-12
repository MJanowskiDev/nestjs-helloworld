import { IsString, IsInt } from 'class-validator';

export class CreateSoldierDto {
  @IsString()
  name: string;

  @IsInt()
  hp: number;

  @IsInt()
  level: number;

  @IsInt()
  id: number;
}
