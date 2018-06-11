import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
/**
 * @author Ethan Zhang
 */
@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (req.method !== 'GET') {
            // JWT_MODULE provided interceptor to append authHeader.
            // const authToken = this.authService.getToken();
            // const authReq = req.clone({headers: req.headers.set(JWT_AUTH_HEADER, authToken)});
            const authReq = req.clone();
            console.log('Request api sent: ' + req.method + ':' + authReq.url)
        }
        return;
    }
}