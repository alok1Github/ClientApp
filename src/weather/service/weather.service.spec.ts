import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AppSettingsService } from "src/shared/appsettings.service";
import { WeatherService } from "./weather.service";
import { mockCitiesResult, mockRequest, mockWeatherResult } from "src/shared/mock-file/weather-mock-data";

describe("WeatherService", () => {
  let contoller: HttpTestingController;
  let service: WeatherService;
  let appSetting = new AppSettingsService();

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService, { provide: AppSettingsService, useValue: appSetting },
      ],
    }).compileComponents();

    contoller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherService);
  }));

  afterEach(() => contoller.verify());

  it("Should create the component", (() => {
    expect(service).toBeTruthy();
  }));

  describe("GetCities", () => {

    it("Should called with correct url and parameters", (() => {
      service.GetCities('GB').subscribe();

      const url = `${appSetting.Urls.get('cityUrl')}?countryCode=GB`;
      commonAssert(url, contoller, mockCitiesResult);
    }));

    it("Should return expected cities", (() => {
      service.GetCities('GB').subscribe(data => expect(data).toEqual(mockCitiesResult));

      const url = `${appSetting.Urls.get('cityUrl')}?countryCode=GB`;
      commonAssert(url, contoller, mockCitiesResult);
    }));

    it("should return expected cities when called multiple times", (() => {
      service.GetCities('GB').subscribe();
      service.GetCities('GB').subscribe(data => expect(data).toEqual(mockCitiesResult));

      const httpCall = contoller.match(`${appSetting.Urls.get('cityUrl')}?countryCode=GB`);

      httpCall[0].flush([]);
      httpCall[1].flush(mockCitiesResult);
    }));

  });

  describe("GetWeatherReport", () => {

    it("Should called with correct url and parameters", (() => {

      service.GetWeatherReport(mockRequest).subscribe();

      const url = `${appSetting.Urls.get('weatherUrl')}?city=London&country=GB&TempratureUnit=1`;
      commonAssert(url, contoller, mockWeatherResult);

    }));

    it("Should called with correct url and parameters", (() => {
      service.GetWeatherReport(mockRequest).subscribe(data => expect(data).toEqual(mockWeatherResult));

      const url = appSetting.Urls.get('weatherUrl');
      let httpCall = contoller.expectOne(`${url}?city=London&country=GB&TempratureUnit=1`);
      expect(httpCall.request.method).toBe('GET');

      httpCall.flush(mockWeatherResult);

    }));

    it("should return expected weather when called multiple times", (() => {
      service.GetWeatherReport(mockRequest).subscribe();
      service.GetWeatherReport(mockRequest).subscribe(data => expect(data).toEqual(mockWeatherResult));

      const httpCall = contoller.match(`${appSetting.Urls.get('weatherUrl')}?city=London&country=GB&TempratureUnit=1`);

      httpCall[0].flush([]);
      httpCall[1].flush(mockWeatherResult);
    }));

  });
  function commonAssert(url: string, contoller: HttpTestingController, result: any) {
    let httpCall = contoller.expectOne(url);

    expect(httpCall.request.method).toBe('GET');

    httpCall.flush(result);
  }


})


