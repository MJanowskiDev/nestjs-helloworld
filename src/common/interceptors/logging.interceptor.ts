import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, delay } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('[Logging interceptor]: Before...');

    const now = Date.now();
    return next.handle().pipe(
      delay(7),
      tap(() =>
        console.log(`[Logging interceptor]: After... ${Date.now() - now}ms`),
      ),
    );
  }
}
