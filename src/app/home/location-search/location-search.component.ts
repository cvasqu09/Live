import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { Coord } from '../coord';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})
export class LocationSearchComponent implements OnInit {
  //We use eventCoord to change the value of centerCoord in the google-map component. centerCoord defines [lat, lng] for map's center
  @Input() public eventCoord: Coord = {
    lat: 5,
    lng: 10
  };
  @ViewChild('search') searchLocation: ElementRef;

  constructor(private mapsAPI: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    //Code for autocomplete in the location search
  	this.mapsAPI.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchLocation.nativeElement, {
        types: ["address"]
      });
      //Code to change value of map's center after a new address is selected
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace(); // Gets the place results
          if (place.geometry === undefined || place.geometry === null){
            return;
          }
          this.eventCoord.lat = place.geometry.location.lat();
          this.eventCoord.lng = place.geometry.location.lng();
        });
      });
    });
  }

}
