import { Component, OnInit } from '@angular/core';
import { WeatherHttpService } from '../service/weather-http.service';
import { Subscription, Subject } from 'rxjs';
import { LocaleData } from '../models/Locale';
import { debounceTime, distinct } from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  data: LocaleData[] = [];
  locale: string;
  foundLocale: LocaleData;

  keySubject = new Subject<string>(); // streams data as the user types
  keySubscription: Subscription;

  // bring in the weather service
  constructor(private weatherService: WeatherHttpService) {}

  ngOnInit() {
    // calls getdata when the user types
    // fires every 200ms to prevent firing on every keystroke
    this.keySubscription = this.keySubject
      .pipe(debounceTime(200), distinct())
      .subscribe((input) => {
        console.log(input);
        this.getData();
      });
  }
  ngOnDestroy() {
    this.keySubscription.unsubscribe();
  }

  // on keypress, send input to this.keySubscription
  sendKeyPress(input: string) {
    this.keySubject.next(input);
  }

  // sets foundLocale to the data that is found
  getData() {
    this.weatherService.getData(this.locale).subscribe(
      (data) => {
        this.foundLocale = {
          locale: data.name,
          country: data.sys.country,
          description: data.weather[0].main,
          temp: data.main.temp,
          icon: data.weather[0].icon,
        };
      },
      (err) => {
        this.foundLocale = undefined;
      }
    );
  }

  // adds foundLocale to the global array
  onSubmit() {
    if (this.foundLocale) {
      console.log(this.foundLocale);
      this.weatherService.addLocale(this.foundLocale);
      this.data = this.weatherService.data;
    }
  }
}
