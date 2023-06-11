import { Injectable } from '@nestjs/common';
import { ForbiddenException } from './common/exceptions/forbidden.exception';

@Injectable()
export class AppService {
  getHello(): string {
    throw new ForbiddenException();
  }
}
