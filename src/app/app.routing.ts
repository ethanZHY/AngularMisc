import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MaterialDashboardComponent } from './components/material-dashboard/material-dashboard.component';

export const APP_ROUTES: Routes = [
    { path: 'home', component: MaterialDashboardComponent},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo:'/home', pathMatch:'full' }
];

export const APP_ROUTING_MODULE = RouterModule.forRoot(APP_ROUTES);