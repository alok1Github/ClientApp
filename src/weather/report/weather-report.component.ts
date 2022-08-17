import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { map, mergeMap } from "rxjs/operators";
import { TempratureEnum, WeatherRequest } from "../weather.requestresult";
import { WeatherService } from "../service/weather.service";


@Component({
  selector: 'experian-report-weather',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherReportComponent implements OnInit {
  weatherForm: FormGroup;

  loading$ = this.service.loading$;
  countries$ = this.service.countries$;

  cities$ = this.service.countryCode$.pipe(
    mergeMap(countryCode => {
      this.service.onLoading(true);

      return this.service.GetCities(countryCode).pipe(
        map(result => {
          this.service.onLoading(false);;

          return result.cities;
        })
      )
    })
  )

  weatherReport$ = this.service.weatherReport$.pipe(
    mergeMap(request => this.service.GetWeatherReport(request)));


  constructor(private fb: FormBuilder, private service: WeatherService) { }

  ngOnInit(): void {
    this.weatherForm = this.fb.group({
      city: [null, Validators.required],
      country: [null, Validators.required],
      tempratureUnit: TempratureEnum.Celsius
    })
  }

  onCountryChange(data: MatSelectChange): void {
    this.service.onCountryChange(data.value);
    this.weatherForm.get('city').reset();
  }

  getWeatherReport(): void {
    if (this.weatherForm.valid && this.weatherForm.dirty) {
      let request = { ...new WeatherRequest(), ...this.weatherForm.value } as WeatherRequest;
      this.service.onWeatherReport(request);
    }
  }

  validateMessage(control: string): string {
    if (this.weatherForm.get(control).hasError('required')) {
      return `You must enter a ${control}`;
    }
    return "";
  }

























  cities = ["London", "Paris", "Moscow", "New York", "Karachi", "Sydney"];

}
