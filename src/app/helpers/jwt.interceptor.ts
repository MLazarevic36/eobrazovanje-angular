import { AuthService } from './../services/AuthService/authentication.service';
import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private injector: Injector) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authService = this.injector.get(AuthService);
		let tokenizedRequest;
		tokenizedRequest = request.clone({
			setHeaders: {
				Authorization: 'Bearer ' + authService.getToken()
			}
		});

		return next.handle(tokenizedRequest);
	}
}
