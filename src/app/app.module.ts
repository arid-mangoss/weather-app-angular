import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherHttpService } from './service/weather-http.service';
import { SavedListComponent } from './saved-list/saved-list.component';
import { InputComponent } from './input/input.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SavedListComponent,
    InputComponent,
    ListComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WeatherHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
