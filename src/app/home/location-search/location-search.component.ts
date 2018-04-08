import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})
export class LocationSearchComponent implements OnInit {
  eventLat: number;
  eventLng: number;
  @ViewChild('search') searchLocation: ElementRef;

  constructor(private mapsAPI: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
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
          this.eventLat = place.geometry.location.lat();
          this.eventLng = place.geometry.location.lng();
        });
      });
    });
  }

}
