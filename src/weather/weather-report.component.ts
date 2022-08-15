import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { Subject } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { WeatherService } from "./weather-report.service";

@Component({
  selector: 'experian-report-weather',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherReportComponent implements OnInit {
  weatherForm: FormGroup;
  countries$ = this.service.countries$;
  citySubject = new Subject<string>();
  cities$ = this.citySubject.asObservable().pipe(
    mergeMap(countryCode => this.service.GetCities(countryCode).pipe(
      map(result => result.cities)
    ))
  )

  constructor(private fb: FormBuilder, private service: WeatherService) { }

  ngOnInit(): void {
    this.weatherForm = this.fb.group({
      cityControl: [null, Validators.required],
      countryControl: [null, Validators.required]
    })
  }

  onCountryChange(data: MatSelectChange): void {
    this.citySubject.next(data.value);
  }
























  cities = ["London", "Paris", "Moscow", "New York", "Karachi", "Sydney"];

}
