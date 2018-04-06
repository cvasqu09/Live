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
      location: [-101.875326, 33.58298],
      eventName: 'Chess Game',
      numPeople: 3,
      rsvps: 2,
      startTime: '1400',
      endTime: '1800',
      description: 'This is a test description for chess game. I need this to be longer for testing for here are some extra words that will help me out!',
      eventOwner: 'auth0-TestUser',
      reports: 0,
      _id: "5ac6e17510988a56e8cd8b2d",
      categories: ['sports','reading'],
    },
    {
      location: [ -101.867258, 33.582982],
      categories: ['sports','reading'],
      eventName: 'Basketball',
      numPeople: 3,
      rsvps: 3,
      startTime: '1400',
      endTime: '1800',
      description: 'This is a test description for basketball.  I need this to be longer for testing for here are some extra words that will help me out!',
      eventOwner: "euth0-TestingAgain",
      reports: 0,
      _id: "5a847edee5847831acb269a4",
    },
    {
      eventName: 'Kickball',
      categories: ['sports','reading'],
      numPeople: 3,
      location: [-101.862280, 33.586413],
      startTime: 1400,
      endTime: 1800,
      description: 'This is a test description for kickball.  I need this to be longer for testing for here are some extra words that will help me out!',
      eventOwner: "euth0-TestingAgain",
      reports: 0,
      rsvps: 1,
      _id: "5a847edee5847831acb269a8",

    },
    {
      location: [-101.873437, 33.590204],
      eventName: 'Cooking',
      numPeople: 10,
      rsvps: 3,
      startTime: '1400',
      endTime: '1800',
      description: 'This is a test description for a cooking class.  I need this to be longer for testing for here are some extra words that will help me out!',
      eventOwner: "euth0-TestingAgain",
      reports: 0,
      _id: "5a847edee5847831acb269a7",
      categories: ['sports','reading']
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
