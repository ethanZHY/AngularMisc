import { JwtModule } from "@auth0/angular-jwt";
import { JWT_AUTH_TOKEN, JWT_AUTH_HEADER } from "../models/app-constants";

/**
 * @author Ethan Zhang
 * config ref: https://www.npmjs.com/package/@auth0/angular-jwt
 */

export function tokenGetter() {
    return localStorage.getItem(JWT_AUTH_TOKEN);
}

export const JWT_MODULE = 
    JwtModule.forRoot({
        config:{
            skipWhenExpired: true,
            tokenGetter: tokenGetter,
            headerName: JWT_AUTH_HEADER,
            // whitelistedDomains: ['localhost:4200'],
            // blacklistedRoutes:['localhost:4200/auth/'],
        }
    });