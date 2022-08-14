import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PolicyModule } from "src/policy/policy.module";
import { WeatherModule } from "src/weather/weather.module";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, PolicyModule, WeatherModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
