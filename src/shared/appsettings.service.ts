import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private baseUrl = `https://localhost:7263/api/`;

  // city
  private cityUrl = `${this.baseUrl}City/`;
  //weather
  private weatherUrl = `${this.baseUrl}Weather/`;

  constructor() {
    this.configSubject.next(this.Urls);
  }


  private configSubject = new BehaviorSubject<Map<string, string>>(null);
  config$ = this.configSubject.asObservable();

  Urls = new Map<string, string>()
    .set("cityUrl", this.cityUrl)
    .set("weatherUrl", this.weatherUrl);



}
