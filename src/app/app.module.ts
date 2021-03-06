import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ToasterService } from './toaster/toaster.service';
import { MessagingService } from './messaging.service';
import { HttpModule } from '@angular/http';
import { IceNumberComponent } from './ice-number/ice-number.component'
import { UserService } from './user/user.service';
import { EventService } from './event/event.service';
import { ReviewService } from './review/review.service';
import { HomeComponent } from './home/home.component';
import { GoogleMapComponent } from './home/google-map/google-map.component';
import { SearchBarComponent } from './home/search-bar/search-bar.component';
import { DropdownComponent } from './home/dropdown/dropdown.component';
import { appRoutes } from './frontend.routing';
import { ProfileComponent } from './profile/profile.component';
import { EventComponent } from './event/event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AgmCoreModule } from '@agm/core';
import { TestMessageServiceComponent } from './test-message-service/test-message-service.component';
import { ViewEventComponent } from './home/view-event/view-event.component';
import { LocationSearchComponent } from './home/location-search/location-search.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ReviewComponent } from './review/review.component';
import { ToasterComponent } from './toaster/toaster.component';
import { CategoryModalComponent } from './profile/category-modal/category-modal.component';
import { CategoriesService } from './categories.service';
import { AddIceNumberModalComponent } from './profile/add-ice-number-modal/add-ice-number-modal.component';
import { ReportModalComponent } from './home/view-event/report-modal/report-modal.component';
import { ReportService } from './home/view-event/report-modal/report.service';

// TODO: Remove apiKey
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoogleMapComponent,
    IceNumberComponent,
    SearchBarComponent,
    DropdownComponent,
    ProfileComponent,
    EventDetailsComponent,
    EventComponent,
    LoginAuthComponent,
    ProfileSettingsComponent,
    TestMessageServiceComponent,
    ViewEventComponent,
    LocationSearchComponent,
    DatePickerComponent,
    ReviewComponent,
    ToasterComponent,
    CategoryModalComponent,
    AddIceNumberModalComponent,
    ReportModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    appRoutes,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAH3tBDHWwu1z0zQ5qDbeQHVjPVizHrkbo',
      libraries: ["places"]
    })
  ],

  providers: [
    UserService,
    EventService,
    MessagingService,
    AuthService,
    AuthGuard,
    ReviewService,
    ToasterService,
    CategoriesService,
    ReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
