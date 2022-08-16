import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { CityResult, Country, WeatherRequest, WeatherResult } from "./weather.requestresult";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private cityUrl = 'https://localhost:7263/api/City/';
  private weatherUrl = 'https://localhost:7263/api/Weather/';

  private citySubject = new Subject<string>();
  private reportSubject = new Subject<WeatherRequest>();
  private loadingSubject = new BehaviorSubject<boolean>(false);

  countries = [
    {
      name: "United Kingdom",
      code: "GB"
    },
    {
      name: "India",
      code: "IN"
    },
    {
      name: "France",
      code: "FR"
    },
    {
      name: "Australia",
      code: "AU"
    }]

  countries$ = of<Country[]>(this.countries); // To do : Ideally this should had come from API/DB
  loading$ = this.loadingSubject.asObservable();
  cities$ = this.citySubject.asObservable();
  weatherReport$ = this.reportSubject.asObservable()

  constructor(private http: HttpClient) { }

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
    this.citySubject.next(city);
  }

  onWeatherReport(request: WeatherRequest): void {
    this.reportSubject.next(request);
  }



}
