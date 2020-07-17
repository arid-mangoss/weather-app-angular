import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  @Input() locale;
  @Input() index;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  // removes locale when clicked
  removeLocale(index: number) {
    this.weatherService.removeLocale(index);
  }
}
