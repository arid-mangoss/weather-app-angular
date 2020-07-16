import { Component, OnInit } from '@angular/core';
import { WeatherHttpService } from './service/weather-http.service';

import { LocaleData } from './models/Locale';
import { debounceTime, map, distinct, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  weatherIcon: string;
  outputData: string;
  data: LocaleData[] = [];
  locale: string;
  foundLocale: LocaleData;

  keySubject = new Subject<any>();

  constructor(private weatherService: WeatherHttpService) {}

  ngOnInit() {
    this.keySubject.pipe(debounceTime(200), distinct()).subscribe((input) => {
      this.getData();
    });
  }

  sendKeyPress(input: string) {
    console.log(input);
    this.keySubject.next(input);
  }

  // sets
  getData() {
    console.log('getdata() called... ');
    this.weatherService.getData(this.locale).subscribe(
      (data) => {
        this.foundLocale = {
          locale: data.name,
          country: data.sys.country,
          description: data.weather[0].description,
          temp: data.main.temp,
          icon: data.weather[0].icon,
        };
      },
      (err) => {
        this.foundLocale = undefined;
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.weatherService.addLocale(this.foundLocale);
    this.data = this.weatherService.data;
  }

  removeLocale(index: number) {
    this.weatherService.removeLocale(index);
  }
}
