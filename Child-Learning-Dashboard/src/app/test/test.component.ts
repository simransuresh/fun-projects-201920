import { Component, OnInit } from '@angular/core';
// import { } from '@types/googlemaps';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public lat;
  public lng;
  // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;

  constructor() { }

  public ngOnInit(): void {
    this.getLocation();
    // let mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  // setCenter(e: any) {
  //   e.preventDefault();
  //   this.map.setCenter(new google.maps.LatLng(this.lat, this.lng));
  // }

}
