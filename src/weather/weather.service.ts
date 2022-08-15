import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { CityResult, country, WeatherRequest, WeatherResult } from "./weather.requestresult";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private cityUrl = 'https://localhost:7263/api/City/';
  private weatherUrl = 'https://localhost:7263/api/Weather/';

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

  countries$ = of<country[]>(this.countries); // To do : Ideally this should had come from API/DB

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
    //.append("TempratureUnit", "1");

    return this.http.get<WeatherResult>(this.weatherUrl, { params: queryParams })
      .pipe(shareReplay(1));
  }



}
