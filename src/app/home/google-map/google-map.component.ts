import { Component, OnInit } from '@angular/core';
import { ViewEventComponent } from '../view-event/view-event.component';
import { EventService } from '../../event/event.service'
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
  providers: [ViewEventComponent, EventService]
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
      "location": [33.58298, -101.875326],
      name: 'Chess Game',
      maxPeople: 3,
      rsvpPeople: 2,
      startTime: '1400',
      endTime: '1800',
      description: 'This is a test description for chess game. I need this to be longer for testing for here are some extra words that will help me out!',
      draggable: true
    },
    {
      "location": [33.582982, -101.867258],
      name: 'Basketball',
      maxPeople: 3,
      rsvpPeople: 3,
      startTime: '1400',
      endTime: '1800',
      description: 'This is a test description for basketball.  I need this to be longer for testing for here are some extra words that will help me out!',
      draggable: true
    },
    {
      "location": [33.586413, -101.862280],
      name: 'Kickball',
      maxPeople: 3,
      rsvpPeople: 1,
      startTime: '1400',
      endTime: '1800',
      description: 'This is a test description for kickball.  I need this to be longer for testing for here are some extra words that will help me out!',
      draggable: true
    },
    {
      "location": [33.590204, -101.873437],
      name: 'Cooking',
      maxPeople: 10,
      rsvpPeople: 3,
      startTime: '1400',
      endTime: '1800',
      description: 'This is a test description for a cooking class.  I need this to be longer for testing for here are some extra words that will help me out!',
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

  constructor(public viewEvent: ViewEventComponent, private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe (res => {
      console.log (res);
    })
  }

  setCurrentEvent(event){

    this.selectedEvent = event;
    this.viewEvent.eventClicked();
  }
}
