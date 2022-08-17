import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject, Subscription } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { AppSettingsService } from "src/shared/appsettings.service";
import { mockCountries } from "src/shared/mock-file/weather-mock-data";
import { CityResult, Country, WeatherRequest, WeatherResult } from "../weather.requestresult";

@Injectable({
  providedIn: 'root'
})

export class WeatherService implements OnDestroy {
  private cityUrl = '';
  private weatherUrl = '';

  private countryCodeSubject = new Subject<string>();
  private reportSubject = new Subject<WeatherRequest>();
  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sub: Subscription;

  countries$ = of<Country[]>(mockCountries); // To do : This needs to come from API from API/DB
  loading$ = this.loadingSubject.asObservable();
  countryCode$ = this.countryCodeSubject.asObservable();
  weatherReport$ = this.reportSubject.asObservable()

  constructor(private http: HttpClient, private app: AppSettingsService) {
    this.app.config$.subscribe(url => {
      this.cityUrl = url.get("cityUrl");
      this.weatherUrl = url.get("weatherUrl");
    })
  }

  GetCities(countryCode: string): Observable<CityResult> {
    return this.http.get<CityResult>(this.cityUrl, {
      params: new HttpParams()
        .append("countryCode", countryCode)
    }).pipe(shareReplay(1));
  }

  GetWeatherReport(request: WeatherRequest): Observable<WeatherResult> {
    let queryParams = new HttpParams()
      .append("city", request.city.name)
      .append("country", request.country)
      .append("TempratureUnit", request.tempratureUnit.toString());

    return this.http.get<WeatherResult>(this.weatherUrl, { params: queryParams })
      .pipe(shareReplay(1));
  }

  onLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  onCountryChange(city: string): void {
    this.countryCodeSubject.next(city);
  }

  onWeatherReport(request: WeatherRequest): void {
    this.reportSubject.next(request);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
