import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return call$.pipe(
      catchError(err => {
        return throwError(new HttpException(err.response, err.status));
      }),
    );
  }
}