import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ViewEventComponent } from '../view-event/view-event.component';
import { EventService } from '../../event/event.service'
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
  providers: [ViewEventComponent, EventService]
})

export class GoogleMapComponent implements OnInit {

  //Initial Zoom
  public zoom: number;

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

  public lat: number;
  public lng: number;

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
  markers: object[];

  @ViewChild('search') searchLocation: ElementRef;

  constructor(public viewEvent: ViewEventComponent, private eventService: EventService, private mapsAPI: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    //Just some default values for map's center
    this.lat = 30.585414;
    this.lng = -101.868846;
    //Default zoom
    this.zoom = 15;
    //This function will change the default values for the center of the map
    this.setCurrentPosition();

    this.eventService.getAllEvents().subscribe (res => {
      this.markers = res;
    });

    this.mapsAPI.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchLocation.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace(); // Gets the place results
          if (place.geometry === undefined || place.geometry === null){
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  setCurrentEvent(event){
    this.selectedEvent = event;
    this.viewEvent.eventClicked();
  }
}
