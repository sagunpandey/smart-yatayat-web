import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Basic ' + token) });
    }

    return next.handle(request);
  }
}
