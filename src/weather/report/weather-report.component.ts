import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { BehaviorSubject, Subject } from "rxjs";
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
  loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();
  countries$ = this.service.countries$;

  cities$ = this.citySubject.asObservable().pipe(
    mergeMap(countryCode => {
      this.loadingSubject.next(true);

      return this.service.GetCities(countryCode).pipe(
        map(result => {
          this.loadingSubject.next(false);

          return result.cities;
        })
      )
    })
  )

  weatherReport$ = this.reportSubject.asObservable().pipe(
    mergeMap(request => this.service.GetWeatherReport(request)));


  constructor(private fb: FormBuilder, private service: WeatherService) { }

  ngOnInit(): void {
    this.weatherForm = this.fb.group({
      city: [null, Validators.required],
      country: [null, Validators.required],
      tempratureUnit: 0
    })
  }

  onCountryChange(data: MatSelectChange): void {
    this.citySubject.next(data.value);
    this.weatherForm.get('city').reset();
  }

  getWeatherReport(): void {
    if (this.weatherForm.valid && this.weatherForm.dirty) {
      let request = { ...new WeatherRequest(), ...this.weatherForm.value } as WeatherRequest;
      this.reportSubject.next(request);
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
