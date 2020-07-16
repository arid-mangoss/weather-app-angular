import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherHttpService } from '../service/weather-http.service';
import { Subscription } from 'rxjs';
import { LocaleData } from '../models/Locale';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  dataSubscription: Subscription;
  data: LocaleData[];

  constructor(private weatherService: WeatherHttpService) {}

  ngOnInit(): void {
    this.dataSubscription = this.weatherService.dataSubject.subscribe(
      (data: LocaleData[]) => {
        this.data = data;
      }
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  // removes locale when clicked
  removeLocale(index: number) {
    this.weatherService.removeLocale(index);
  }
}
