import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'experian-report-weather',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherReportComponent {
  cities = ["London", "Paris", "Moscow", "New York", "Karachi", "Sydney"];
  countries = [
    {
      name: "United Kingdom",
      cities: ["London", "Warwick", "Birmingham"]
    },]
}
