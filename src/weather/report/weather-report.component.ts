import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { Subject } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { WeatherRequest } from "../weather.requestresult";
import { WeatherService } from "../weather.service";


@Component({
  selector: 'experian-report-weather',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherReportComponent implements OnInit {
  weatherForm: FormGroup;
  citySubject = new Subject<string>();
  reportSubject = new Subject<WeatherRequest>();

  countries$ = this.service.countries$;

  cities$ = this.citySubject.asObservable().pipe(
    mergeMap(countryCode => this.service.GetCities(countryCode).pipe(
      map(result => result.cities)
    ))
  )

  weatherReport$ = this.reportSubject.asObservable().pipe(
    mergeMap(request => this.service.GetWeatherReport(request)));


  constructor(private fb: FormBuilder, private service: WeatherService) { }

  ngOnInit(): void {
    this.weatherForm = this.fb.group({
      city: [null, Validators.required],
      country: [null, Validators.required]
    })
  }

  onCountryChange(data: MatSelectChange): void {
    this.citySubject.next(data.value);
  }

  getWeatherReport(): void {
    let request = { ...new WeatherRequest(), ...this.weatherForm.value } as WeatherRequest;

    this.reportSubject.next(request);
  }
























  cities = ["London", "Paris", "Moscow", "New York", "Karachi", "Sydney"];

}
