import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'experian-report-weather',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherReportComponent implements OnInit {
  weatherForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.weatherForm = this.fb.group({
      cityControl: [null, Validators.required],
      countryControl: [null, Validators.required]
    })
  }
























  cities = ["London", "Paris", "Moscow", "New York", "Karachi", "Sydney"];
  countries = [
    {
      name: "United Kingdom",
      cities: ["London", "Warwick", "Birmingham"]
    },]
}
