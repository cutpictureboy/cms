import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  result: T;
}

@Injectable()
export class SuccessInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    call$: Observable<T>,
  ): Observable<Response<T>> {
    return call$.pipe(
      map(result => {
        return ({
          statusCode: 200,
          result: result || null,
        });
      }),
    );
  }
}
