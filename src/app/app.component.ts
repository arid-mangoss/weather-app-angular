import { Component, OnInit } from '@angular/core';
import { WeatherHttpService } from './service/weather-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  city: string;
  weatherIcon: string;
  outputData: string;

  constructor(private weatherService: WeatherHttpService) {}

  ngOnInit() {}

  getData() {
    this.weatherService.getCityData(this.city).subscribe((data) => {
      console.log(data);
      this.outputData = `${data.name}, ${data.sys.country} -- ${JSON.stringify(
        data.weather[0]
      )}`;
      this.weatherIcon = data.weather[0].icon;
    },
    (err) =>{
      console.log(err);
      this.city = undefined;
      this.weatherIcon = undefined;
      this.outputData = undefined
    });
  }
}
