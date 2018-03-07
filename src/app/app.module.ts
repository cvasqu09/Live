import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { UserService } from './user/user.service';
import { HomeComponent } from './home/home.component';
import { GoogleMapComponent } from './home/google-map/google-map.component';
import { SearchBarComponent } from './home/search-bar/search-bar.component';
import { DropdownComponent } from './home/dropdown/dropdown.component';
import { appRoutes } from './frontend.routing';
import { ProfileComponent } from './profile/profile.component';
import { EventDetailsComponent } from './event-details/event-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoogleMapComponent,
    SearchBarComponent,
    DropdownComponent,
    ProfileComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    appRoutes
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
