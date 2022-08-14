import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Policy } from "./policy.model";

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  // private url = 'https://localhost:44319/api/Policy/';
  private url = 'https://localhost:7263/api/Weather/';

  private policyDataSubject = new BehaviorSubject<Policy>(new Policy());

  private queryParams = new HttpParams()
    .append("city", "Sagar")
    .append("country", "IN")
    .append("airquality", "true")
    .append("TempratureUnit", "1");

  constructor(private http: HttpClient) { }

  policies$ = this.http.get<any>(this.url).pipe(
    map(data => {
      console.log("data: " + JSON.stringify(data));
      return data;
    })
  );
  policyData$ = this.policyDataSubject.asObservable();

  addPolicy(request: Policy): Observable<any> {
    return this.http.get<any>(this.url, { params: this.queryParams }).pipe(
      map(data => {
        console.log("data: " + JSON.stringify(data));
        return data;
      }));
  }

  // addPolicy(request: Policy): Observable<any> {
  //   return this.http.post<any>(this.url, request).pipe(
  //     map(data => {
  //       console.log("data: " + JSON.stringify(data));
  //       return data;
  //     }));
  // }


  updatePolicy(request: Policy): Observable<void> {
    return this.http.patch<void>(this.url, request);
  }

  deletePolicy(policyNumber: number): Observable<void> {
    const options = { params: new HttpParams().set('policyNumber', policyNumber.toString()) };

    return this.http.delete<void>(`${this.url}`, options);
  }

  onGetPolicyData(policy: Policy): void {
    this.policyDataSubject.next(policy);
  }
}




