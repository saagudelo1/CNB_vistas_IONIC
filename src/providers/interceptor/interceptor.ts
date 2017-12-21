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
    let auth;
    if (localStorage.getItem("access_token") == undefined)
      auth = "Basic YmFuaXN0bW9BVE06Y25ic2VjcmV0QVRN";
      else
      auth = "bearer " + localStorage.getItem("access_token");
    request = request.clone({
      setHeaders: {
        "Authorization": auth,
        "Content-Type": "application/json"

      }
    });
    return next.handle(request);
  }
}