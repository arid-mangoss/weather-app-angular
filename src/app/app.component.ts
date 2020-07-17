import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from './service/weather.service';

import { LocaleData } from './models/Locale';
import { debounceTime, distinct } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
