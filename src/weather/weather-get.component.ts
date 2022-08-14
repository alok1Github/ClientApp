import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'experian-get-weather',
  templateUrl: './weather-get.component.html',
  styleUrls: ['./weather-get.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherGetComponent {
  cities = ["London", "Paris", "Moscow", "New York", "Karachi", "Sydney"];
  countries = [
    {
      name: "United Kingdom",
      cities: ["London", "Warwick", "Birmingham"]
    },]
}
