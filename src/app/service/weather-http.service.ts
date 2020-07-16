import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LocaleData } from '../models/Locale';

@Injectable({
  providedIn: 'root',
})
export class WeatherHttpService {
  data: LocaleData[] = [];

  dataSubject = new Subject<LocaleData[]>();

  constructor(private http: HttpClient) {}

  getData(locale: string): Observable<any> {
    const API_KEY = '004e20e998a0e5136ffd9266cd78f444';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${locale}&appid=${API_KEY}&units=imperial`;
    console.log('url', url);
    return this.http.get(url);
  }

  addLocale(locale: LocaleData) {
    if (this.data.indexOf(locale) === -1) {
      this.data.push(locale);
      this.dataSubject.next(this.data);
      console.log('next called')
    }

  }

  removeLocale(index) {
    this.data.splice(index, 1);
    this.dataSubject.next(this.data);
  }
}
