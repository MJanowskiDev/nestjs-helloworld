import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateSoldierDto } from './dto/create-soldier.dto';
import { Soldier } from './interfaces/soldier.interface';
import { ArmyService } from './army.service';
import { JoiValidationPipe } from './validators/soldier-validation.pipe';
import { createSoldierSchema } from './schema/soldier.schema';
import { ClassValidationPipe } from './validators/class-validation.pipe';
import { ParseIntPipe } from 'src/common/pipe/parse-int.pipe';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { ErrorsInterceptor } from 'src/common/interceptors/error.interceptor';
import { TimeoutInterceptor } from 'src/common/interceptors/timeout.interceptor';

@Controller('army')
@UseInterceptors(LoggingInterceptor)
export class ArmyController {
  constructor(private armyService: ArmyService) {}

  @Post('soldier/metadata')
  @Roles('admin')
  async createWithMetadata(@Body() createSoldierDto: CreateSoldierDto) {
    this.armyService.create(createSoldierDto);
  }

  @Get('guard')
  @UseGuards(AuthGuard)
  getStatus() {
    return 'OK';
  }

  @Get('randomized')
  @HttpCode(202)
  getRandomizedArmy() {
    return 'Hello world from army controller';
  }

  @Get('ab*cd')
  getWildcardArmy(@Res() response: Response, @Req() request: Request) {
    return response
      .status(203)
      .send({ msg: 'Wildcard army', href: request.url });
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  @HttpCode(201)
  create() {
    return 'New army soldier created';
  }

  //localhost:3000/army/docs?version=5
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version === '5') {
      console.log(version);
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  //localhost:3000/army/name/:name
  @Get('/name/:name')
  getSoliderById(@Param('name') name: string): string {
    return `This is soldier: ${name}`;
  }

  @Put('soldier/:id')
  replaceSoldier(
    @Param('id') id: string,
    @Body() createSoldierDto: CreateSoldierDto,
  ) {
    return `Replaced soldier of id ${id} with new ${JSON.stringify(
      createSoldierDto,
    )}`;
  }

  @Get('soldier/best')
  findBest(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.ACCEPTED);
    return [];
  }

  @Get()
  getArmy(): Soldier[] {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return this.armyService.findAll();
  }

  @Post('soldier')
  @UsePipes(new JoiValidationPipe(createSoldierSchema))
  async createSoldier(@Body() createSoldierDto: CreateSoldierDto) {
    return this.armyService.create(createSoldierDto);
  }

  @Post('soldier-class')
  @UsePipes(new JoiValidationPipe(createSoldierSchema))
  async createSoldierClassValidator(
    @Body(new ClassValidationPipe()) createSoldierDto: CreateSoldierDto,
  ) {
    return this.armyService.create(createSoldierDto);
  }

  @Get('soldier/:id')
  async getOneSoldier(@Param('id', ParseIntPipe) id: number) {
    return this.armyService.findOne(id);
  }

  @Get('soldier/v2/:id')
  getOneSoldierV2(@Param('id', new ParseIntPipe()) id: number) {
    return this.armyService.findOne(id);
  }
  @Get('error')
  @UseInterceptors(ErrorsInterceptor)
  async getArmyError() {
    throw new HttpException('Forbidden', HttpStatus.AMBIGUOUS);
  }

  @Get('soldier-active')
  findAll(
    @Query('activeOnly', new DefaultValuePipe(true), ParseBoolPipe)
    activeOnly: boolean,
  ) {
    console.log('This is default query param activeOnly', activeOnly);
  }

  @Get('timeout')
  @UseInterceptors(TimeoutInterceptor)
  async getTimedOut() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  }
}
