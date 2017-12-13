import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        "Authorization": "Basic YmFuaXN0bW9BVE06Y25ic2VjcmV0QVRN",
        "Content-Type": "application/json"

      }
    });
    return next.handle(request);
  }
}