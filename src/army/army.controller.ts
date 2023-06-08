import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('army')
export class ArmyController {
  @Get('randomized')
  @HttpCode(202)
  getRandomizedArmy() {
    return 'Hello world from army controller';
  }

  @Get('ab*cd')
  getArmy(@Res() response: Response, @Req() request: Request) {
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

  //localhost:3000/army/:name
  @Get(':name')
  getSoliderById(@Param('name') name: string): string {
    return `This is soldier: ${name}`;
  }
}
