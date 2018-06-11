import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MaterialDashboardComponent } from './components/material-dashboard/material-dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { RouteGuardService as RouterGuard } from './services/route-guard.service';

export const APP_ROUTES: Routes = [
    { path: 'home', component: MaterialDashboardComponent, canActivate: [RouterGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', redirectTo:'/login', pathMatch:'full' },
];

export const APP_ROUTING_MODULE = RouterModule.forRoot(APP_ROUTES);