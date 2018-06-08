import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { APP_ROUTING_MODULE } from './app.routing';
import { APP_COMPONENTS_MODULE } from './utils/app.components-module';
import { MATERIAL_MODULE } from './utils/material-module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDashboardComponent } from './components/material-dashboard/material-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DIRECTIVES_MODULE } from './utils/app.directives-module';
import { UniqueUsernameValidatorDirective } from './directives/unique-username-validator.directive';


@NgModule({
  declarations: [
    AppComponent,
    APP_COMPONENTS_MODULE,
    DIRECTIVES_MODULE,
    MaterialDashboardComponent,
    UniqueUsernameValidatorDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING_MODULE,
    MATERIAL_MODULE,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
