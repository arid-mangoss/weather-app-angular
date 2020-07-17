import { Injectable } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Injectable({
  providedIn: 'root',
})
export class SavedListService {
  constructor(private weatherService: WeatherService) {}


}
