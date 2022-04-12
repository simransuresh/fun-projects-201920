import { element } from 'protractor';
import { UserInfo } from './../auth.service';
import { Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var ol: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {
  userInfo: any = {
    username: '',
  };

  latitude: number = 13;
  longitude: number = 80;
  map: any;
  results: any;
  constructor(private http: HttpClient) {

   }
   ngOnInit() {
        this.map = new ol.Map({
        target: "map",
        layers: [
        new ol.layer.Tile({
        source: new ol.source.OSM({
        url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        })
        })
        ],
        view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 8
        })
        });
        this.map.on('click', function (args) {
          console.log(args.coordinate);
          var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
          console.log(lonlat);
          var lat = lonlat[0];
          var lon = lonlat[1];
          alert(`lat: ${lat} long: ${lon}`);
        });
  }
    showUsersLocation() {
      // let element;
      this.http.get('http://localhost:5000/users/location').subscribe(
        (res: any) => {
          console.log(res.result);
          res.result.forEach(element => {
            console.log(element.username, element.latitude, element.longitude);
            this.add_map_point(element.username, element.latitude, element.longitude);
          });
        },
        (err: any) => {
          console.log(err);
        });
      // this.add_map_point(13.09, 80.12);
    }

    add_map_point(username, lat, lng) {
      let statusIcon: any = {};
      //let statusIcon1: any;
      console.log(typeof username, typeof lat, typeof lng);
      console.log(username, lat, lng);
      console.log('Inside map plot function:::');
      this.userInfo.username = username;
      this.http.post('http://localhost:5000/user/isactive', this.userInfo).subscribe(
        (res: any) => {
          console.log(res.result);
          if (res.result == true) {
            //plotUserLocation('../../assets/green.png');
              let vectorLayer = new ol.layer.Vector({
              source: new ol.source.Vector({
              features: [new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
              })]
              }),
              style: new ol.style.Style({
              image: new ol.style.Icon({
              anchor: [0.5, 0.5],
              anchorXUnits: "fraction",
              anchorYUnits: "fraction",
              src: '../../assets/green.png'
              })
              })
              });
              this.map.addLayer(vectorLayer);
              var hoverInteraction = new ol.interaction.Select({
                condition: ol.events.condition.pointerMove,
                layers: [vectorLayer],
              });
              this.map.addInteraction(hoverInteraction);
              this.map.on('hover', function (args) {
                console.log(args.coordinate);
                var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
                console.log(lonlat);
                var latitude = Math.round(lonlat[0]);
                var longitude = Math.round(lonlat[1]);
                //var user;
                if(latitude == lat && longitude == lng)
                alert(`lat: ${latitude} long: ${longitude} user: ${username}`);
              });
          } else {
            //plotUserLocation('../../assets/red.png');
              let vectorLayer = new ol.layer.Vector({
              source: new ol.source.Vector({
              features: [new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
              })]
              }),
              style: new ol.style.Style({
              image: new ol.style.Icon({
              anchor: [0.5, 0.5],
              anchorXUnits: "fraction",
              anchorYUnits: "fraction",
              src: '../../assets/red.png'
              })
              })
              });
              this.map.addLayer(vectorLayer);
              var hoverInteraction = new ol.interaction.Select({
                condition: ol.events.condition.pointerMove,
                layers: [vectorLayer],
              });
              this.map.addInteraction(hoverInteraction);
              this.map.on('hover', function (args) {
                console.log(args.coordinate);
                var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
                console.log(lonlat);
                var latitude = Math.round(lonlat[0]);
                var longitude = Math.round(lonlat[1]);
                //var user;
                if(latitude == lat && longitude == lng)
                alert(`lat: ${latitude} long: ${longitude} user: ${username}`);
              });
          }
        },
        (err: any) => {
          console.log(err);
      });
    }
}
