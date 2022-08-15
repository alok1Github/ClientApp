import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PolicyModule } from "src/policy/policy.module";
import { WeatherModule } from "src/weather/weather.module";
import { RouterModule, Routes } from "@angular/router";
import { GlobalErrorComponent } from "src/shared/error/error-global.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GlobalHttpInterceptorService } from "src/shared/interceptor/http-error.interceptor";
import { WeatherReportComponent } from "src/weather/report/weather-report.component";

const routes: Routes = [
  { path: 'error/:message', component: GlobalErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: WeatherReportComponent }
] // To Do : This can in another module in bigger app.

@NgModule({
  declarations: [AppComponent, GlobalErrorComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    PolicyModule,
    WeatherModule,
    RouterModule.forRoot(routes)],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
