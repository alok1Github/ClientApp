import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Observable, of } from "rxjs";
import { AngularMaterialModule } from "src/shared/angular-material.module";
import { CityResult, Country, TempratureEnum, WeatherRequest, WeatherResult } from "../weather.requestresult";
import { WeatherService } from "../weather.service";
import { WeatherReportComponent } from "./weather-report.component";

describe("WeatherReportComponent", () => {
  let fixture: ComponentFixture<WeatherReportComponent>;
  let component: WeatherReportComponent;
  let fromBuilder = new FormBuilder();

  const countries: Country[] = [{ name: "United Kingdom", code: "GB" }, { name: "India", code: "IN" }];
  const citiesResult: CityResult = { cities: [{ name: "London", id: 123 }, { name: "Edinburgh", id: 234 }] };

  const mockService = {
    countries$: of(countries),
    loading$: of(false),
    cities$: of("GB"),
    weatherReport$: of(new WeatherRequest()),
    GetCities(countryCode: string): Observable<CityResult> {
      return of(citiesResult);
    },
    GetWeatherReport(request: WeatherRequest): Observable<WeatherResult> {
      return;
    },
    onLoading(loading: boolean): void { },
    onCountryChange(city: string): void { },
    onWeatherReport(request: WeatherRequest): void { }
  };

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [WeatherReportComponent],
      imports: [AngularMaterialModule, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [{ provide: WeatherService, useValue: mockService },
      { provide: FormBuilder, useValue: fromBuilder }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherReportComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();

  }));

  it("Should create the component", (() => {
    expect(component).toBeTruthy();
  }));

  describe("On Page Load", () => {

    it("Countries should be loaded", (() => {
      let result: Country[] = [];

      component.countries$.subscribe(data => result = data);

      expect(result).toBe(countries);
    }));

    it("Cities should be empty", (() => {
      let cities = component.weatherForm.get('city').value;

      expect(cities).toBeNull();
    }));

    it("TempratureUnit should be defaulted to 'Celsius'", (() => {
      component.ngOnInit();

      let tempratureUnit = component.weatherForm.get('tempratureUnit').value;

      expect(tempratureUnit).toBe(TempratureEnum.Celsius);
    }));


    // To Do : Other test like default radio button checked on page load
  });

  describe("On Country selection", () => {

    it("Cities should be loaded", (() => {
      let result: CityResult = { cities: [] };

      component.onCountryChange(new MatSelectChange(null, 'GB'));

      component.cities$.subscribe(data => {
        result.cities = data
      })

      expect(result.cities).toBe(citiesResult.cities);
    }));

    it("Cities should be clear/empty before country selection", (() => {
      component.onCountryChange(new MatSelectChange(null, 'GB'));

      let cities = component.weatherForm.get('city').value;

      expect(cities).toBeNull();
    }));

    // To Do : Other test like loader start when country gets selected and stop when city loaded .

  });

});
