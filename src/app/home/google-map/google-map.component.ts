import { Component, OnInit } from '@angular/core';
import { ViewEventComponent } from '../view-event/view-event.component';
import { Event } from '../../event/event.model'
import { EventService } from '../../event/event.service';
import { Coord } from '../coord';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
  providers: [ViewEventComponent, EventService]
})

export class GoogleMapComponent implements OnInit {

  //Initial Zoom
  public zoom: number;
  public lat: number;
  public lng: number;

  public centerCoord: Coord = {
    lat: 33.578682,
    lng: -101.871623
  };

  // Styke Maps Here: https://mapstyle.withgoogle.com/
  // Or copy paste custom json google maps
  styles =
  [
   {
       "featureType": "landscape.natural",
       "elementType": "geometry.fill",
       "stylers": [
           {
               "visibility": "on"
           },
           {
               "color": "#e0efef"
           }
       ]
   },
   {
       "featureType": "poi",
       "elementType": "geometry.fill",
       "stylers": [
           {
               "visibility": "on"
           },
           {
               "hue": "#1900ff"
           },
           {
               "color": "#c0e8e8"
           }
       ]
   },
   {
       "featureType": "road",
       "elementType": "geometry",
       "stylers": [
           {
               "lightness": 100
           },
           {
               "visibility": "simplified"
           }
       ]
   },
   {
       "featureType": "road",
       "elementType": "labels",
       "stylers": [
           {
               "visibility": "off"
           }
       ]
   },
   {
       "featureType": "road.local",
       "elementType": "all",
       "stylers": [
           {
               "visibility": "on"
           }
       ]
   },
   {
       "featureType": "road.local",
       "elementType": "geometry",
       "stylers": [
           {
               "visibility": "on"
           }
       ]
   },
   {
       "featureType": "road.local",
       "elementType": "geometry.fill",
       "stylers": [
           {
               "visibility": "on"
           }
       ]
   },
   {
       "featureType": "road.local",
       "elementType": "geometry.stroke",
       "stylers": [
           {
               "visibility": "on"
           }
       ]
   },
   {
       "featureType": "road.local",
       "elementType": "labels",
       "stylers": [
           {
               "visibility": "on"
           }
       ]
   },
   {
       "featureType": "road.local",
       "elementType": "labels.text",
       "stylers": [
           {
               "visibility": "on"
           }
       ]
   },
   {
       "featureType": "road.local",
       "elementType": "labels.text.fill",
       "stylers": [
           {
               "visibility": "on"
           }
       ]
   },
   {
       "featureType": "road.local",
       "elementType": "labels.text.stroke",
       "stylers": [
           {
               "visibility": "on"
           }
       ]
   },
   {
       "featureType": "road.local",
       "elementType": "labels.icon",
       "stylers": [
           {
               "visibility": "on"
           }
       ]
   },
   {
       "featureType": "transit.line",
       "elementType": "geometry",
       "stylers": [
           {
               "visibility": "on"
           },
           {
               "lightness": 700
           }
       ]
   },
   {
       "featureType": "water",
       "elementType": "all",
       "stylers": [
           {
               "color": "#7dcdcd"
           }
       ]
   }
 ];

  selectedEvent: object = {};
  markers: Event[] = [];
  constructor(
    public viewEvent: ViewEventComponent,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.zoom = 15;
    //This function will change the default values for the center of the map
    this.setCurrentPosition();
    this.eventService.getAllEvents().subscribe (res => {
      this.markers = res;
    })
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.centerCoord.lat = position.coords.latitude;
        this.centerCoord.lng = position.coords.longitude;
      });
    }
  }

  setCurrentEvent(event){
    this.selectedEvent = event;
    this.viewEvent.eventClicked();
  }

  zoomIn(){

    this.zoom += 1;
  }

  zoomOut(){

    this.zoom -= 1;
  }

  getProperMarker(markerInfo): string {

    if(markerInfo.rsvps.rsvpUsers.indexOf(localStorage.getItem('user_id')) != -1){
      return "assets/markers/joined-event-32.png";
    }
    else {
      return "assets/markers/default-event-32.png";
    }
  }
}
