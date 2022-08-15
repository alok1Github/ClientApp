import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared/shared.module";
import { WeatherReportComponent } from "./report/weather-report.component";


@NgModule({
  declarations: [WeatherReportComponent],
  imports: [SharedModule],
  exports: [WeatherReportComponent],

})
export class WeatherModule { }
