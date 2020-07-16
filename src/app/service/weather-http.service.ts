import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherHttpService {
  constructor(private http: HttpClient) {}

  getCityData(city: string): Observable<any> {
    const API_KEY = '004e20e998a0e5136ffd9266cd78f444';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    console.log('url', url)
    return this.http.get(url,);
  }
}
