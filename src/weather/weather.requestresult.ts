// City and Country Model's
export interface Country {
  name: string;
  code: string;
}

export interface City {
  name: string;
  id: number;
}

export interface CityResult {
  cities: City[]
}

// Weather Model's
export interface WeatherResult {
  location: Location;
  current: Temprature;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

export interface Temprature {
  temprature: number;
  condition: Condition;
}

export interface Condition {
  text: string;
}


export class WeatherRequest {
  city: City;
  country: string;
  tempratureUnit: TempratureEnum
}

export enum TempratureEnum {
  Celsius,
  Fahrenheit
}


