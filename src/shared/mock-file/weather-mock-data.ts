import { Observable, of } from "rxjs";
import { CityResult, Country, TempratureEnum, WeatherRequest, WeatherResult } from "src/weather/weather.requestresult";

export const mockCountries: Country[] = [
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

export const mockCitiesResult: CityResult =
  { cities: [{ name: "London", id: 123 }, { name: "Edinburgh", id: 234 }] };

export const mockWeatherResult: WeatherResult =
{
  location: {
    name: "London",
    region: "City of London, Greater London",
    country: "United Kingdom",
    localtime: "2022-08-17 12:53"
  },
  current: {
    temprature: 73.4,
    condition: {
      text: "Moderate rain",
    }

  }
}

export const mockRequest: WeatherRequest = {
  city: {
    name: 'London',
    id: 123
  },
  country: 'GB',
  tempratureUnit: TempratureEnum.Fahrenheit
}

export const mockService = {
  countries$: of(mockCountries),
  loading$: of(false),
  cities$: of("GB"),
  weatherReport$: of(new WeatherRequest()),
  GetCities(countryCode: string): Observable<CityResult> {
    return of(mockCitiesResult);
  },
  GetWeatherReport(request: WeatherRequest): Observable<WeatherResult> {
    return;
  },
  onLoading(loading: boolean): void { },
  onCountryChange(city: string): void { },
  onWeatherReport(request: WeatherRequest): void { }
};
