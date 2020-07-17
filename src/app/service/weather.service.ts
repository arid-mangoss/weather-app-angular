import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LocaleData } from '../models/Locale';

import { API_KEY } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  data: LocaleData[] = [];

  dataSubject = new Subject<LocaleData[]>();

  constructor(private http: HttpClient) {}

  getData(locale: string): Observable<any> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${locale}&appid=${API_KEY}&units=imperial`;
    return this.http.get<any>(url);
  }

  addLocale(locale: LocaleData) {
    if (this.data.indexOf(locale) === -1) {
      this.data.push(locale);
      this.dataSubject.next(this.data);
    }
  }

  removeLocale(index) {
    this.data.splice(index, 1);
    this.dataSubject.next(this.data);
  }

  removeAllLocales() {
    this.data = [];
    this.dataSubject.next(this.data);
  }

  getListOfLocales(): string[] {
    let locales = [];
    this.data.forEach((item: LocaleData) => {
      locales.push(item.locale + ', ' + item.country);
    });
    return locales;
  }
}
