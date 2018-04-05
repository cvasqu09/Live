import { Component, OnInit } from '@angular/core';
import { ViewEventComponent } from '../view-event/view-event.component';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
  providers: [ViewEventComponent]
})

export class GoogleMapComponent implements OnInit {

  //Initial Zoom
  zoom: number = 15;

  //Center coordinates for the map
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(
  //     function(position) {
  //       lat: number = position.coords.latitude;
  //       lng: number = position.coords.longitude;
  //     });
  // } else {
  //   lat: number = 51.678418;
  //   lng: number = 7.809007;
  // }

  lat: number = 33.585414;
  lng: number = -101.868846;

  //Markers array
  markers: object[] =
  [
    {
      lat: 33.582983,
      lng: -101.875326,
      name: 'Chess Game',
      maxPeople: 3,
      rsvpPeople: 2,
      startTime: '2:00pm',
      endTime: '4:00pm',
      description: 'This is a test description for chess game',
      draggable: true
    },
    {
      lat: 33.582982,
      lng: -101.867258,
      name: 'Basketball',
      maxPeople: 3,
      rsvpPeople: 3,
      startTime: '2:00pm',
      endTime: '4:00pm',
      description: 'This is a test description for basketball',
      draggable: true
    },
    {
      lat: 33.586413,
      lng: -101.862280,
      name: 'Kickball',
      maxPeople: 3,
      rsvpPeople: 1,
      startTime: '2:00pm',
      endTime: '4:00pm',
      description: 'This is a test description for kickball',
      draggable: true
    }
  ];

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

  constructor(public viewEvent: ViewEventComponent) { }

  ngOnInit() { }

  setCurrentEvent(event){

    this.selectedEvent = event;
    this.viewEvent.eventClicked();
  }
}
