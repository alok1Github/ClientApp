import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { CityResult, country } from "./weather-report.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private cityUrl = 'https://localhost:7263/api/City/';

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
      name: "australia",
      code: "AU"
    }]

  countries$ = of<country[]>(this.countries); // To do : Ideally this should had come from API/DB
  city$ = this.http.get

  constructor(private http: HttpClient) { }

  GetCities(countryCode: string): Observable<CityResult> {
    return this.http.get<CityResult>(this.cityUrl, {
      params: new HttpParams()
        .append("countryCode", countryCode)
    }).pipe(shareReplay(1));
  }

}
