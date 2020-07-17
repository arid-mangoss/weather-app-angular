import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { LocaleData } from '../models/Locale';

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.css'],
})
export class SavedListComponent implements OnInit {
  savedLists: Array<Array<string>> = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  addList() {
    this.savedLists.push(this.weatherService.getListOfLocales());
    this.weatherService.removeAllLocales();
  }

  loadList() {
    let list = this.savedLists[0];
    list.forEach((locale: string) => {
      this.weatherService.getData(locale).subscribe((data) => {
        let locale: LocaleData = {
          locale: data.name,
          country: data.sys.country,
          description: data.weather[0].main,
          temp: data.main.temp,
          icon: data.weather[0].icon,
        };
        this.weatherService.addLocale(locale);
      });
    });
  }
}
