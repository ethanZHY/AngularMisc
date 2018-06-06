import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { APP_ROUTING_MODULE } from './app.routing';
import { APP_COMPONENTS_MODULE } from './utils/app.components-module';
import { MATERIAL_MODULE } from './utils/material-module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { MaterialDashboardComponent } from './components/material-dashboard/material-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    APP_COMPONENTS_MODULE,
    MaterialDashboardComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING_MODULE,
    MATERIAL_MODULE,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
