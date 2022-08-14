import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url = 'https://localhost:7263/api/Weather/';

}
