import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared/shared.module";
import { WeatherGetComponent } from "./weather-get.component";

@NgModule({
  declarations: [WeatherGetComponent],
  imports: [SharedModule],
  exports: [WeatherGetComponent],

})
export class WeatherModule { }
