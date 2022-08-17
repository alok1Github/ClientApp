import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "src/shared/angular-material.module";
import { CityResult, Country, TempratureEnum } from "../weather.requestresult";
import { WeatherService } from "../service/weather.service";
import { WeatherReportComponent } from "./weather-report.component";
import { mockCitiesResult, mockCountries, mockService } from "src/shared/mock-file/weather-mock-data";
import { of } from "rxjs";

describe("WeatherReportComponent", () => {
  let fixture: ComponentFixture<WeatherReportComponent>;
  let component: WeatherReportComponent;
  let fromBuilder = new FormBuilder();

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

      expect(result).toBe(mockCountries);
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
  });

  describe("On Country selection", () => {

    it("Cities should be loaded", (() => {
      let result: CityResult = { cities: [] };

      component.onCountryChange(new MatSelectChange(null, 'GB'));

      component.cities$.subscribe(data => {
        result.cities = data
      })

      expect(result.cities).toBe(mockCitiesResult.cities);
    }));

    it("Cities should be clear/empty before country selection", (() => {
      component.onCountryChange(new MatSelectChange(null, 'GB'));

      let cities = component.weatherForm.get('city').value;

      expect(cities).toBeNull();
    }));

  });

  describe("On getWeatherReport", () => {

    it("getWeatherReport service will not get called only if from is invalid and not dirty", (() => {
      let service = TestBed.inject(WeatherService);
      let spy = spyOn(service, 'onWeatherReport');

      component.getWeatherReport();

      expect(spy).toHaveBeenCalledTimes(0);
    }));

    it("getWeatherReport service will get called if from is invalid and not dirty", (() => {
      component.weatherForm.patchValue({
        city: 'London',
        country: 'GB'
      })
      component.weatherForm.markAllAsTouched();
      component.weatherForm.markAsDirty();

      let service = TestBed.inject(WeatherService);
      let spy = spyOn(service, 'onWeatherReport');
      let spy2 = spyOn(service, 'GetWeatherReport').and.returnValue(of());

      component.weatherReport$.subscribe();

      component.getWeatherReport();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    }));

    // To Do : Other test like loader start when country gets selected and stop when city loaded .

  });

  // To do : Test for validation
  // To do : Once Country's data comes from server then test needs to be written

});
