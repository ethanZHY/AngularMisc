import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { JWT_AUTH_HEADER } from "./models/app-constants";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const authToken = this.authService.getToken();
        if (req.method !== 'GET') {
            const authReq = req.clone({headers: req.headers.set(JWT_AUTH_HEADER, authToken)});
            console.log('Request api sent: ' + req.method + ':' + authReq.url)
        }
        return;
    }
}