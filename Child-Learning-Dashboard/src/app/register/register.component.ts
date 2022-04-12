import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, FormsModule  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'rxjs';
import { AuthService, UserDetails} from '../auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
//import { } from '@types/googlemaps';

@Component({
  //selector: 'app-register',
  templateUrl: './register.component.html',
  //styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public lat;
  public lng;

  userDetail: UserDetails = {
    name: '',
    username: '',
    password: '',
    active: false,
    usertype: 0,  //default user type is USER
    image: '',
    location: [],
  };

  public showNotification( type: string, message: string ): void {
	  this.notifier.notify( type, message );
  }

  constructor(private auth: AuthService, private router: Router, private http: HttpClient, private notifier: NotifierService) {}

  ngOnInit() {
    // this.getLocation();
    // console.log(this.userDetail.location);
  }

  regSubmit(regDetails: NgForm) {
    this.userDetail.name = regDetails.value.name;
    this.userDetail.username = regDetails.value.username;
    this.userDetail.password = regDetails.value.password;
    this.userDetail.active = true;
    let typeOfUser = regDetails.value.usertype;
    if (typeOfUser === 'superadmin') {
      this.userDetail.usertype = 0;
    }
    if (typeOfUser === 'admin') {
      this.userDetail.usertype = 1;
    }
    if (typeOfUser === 'user') {
      this.userDetail.usertype = 2;
    }
    //this.userDetail.image = regDetails.value.image;

    console.log(this.userDetail);

    this.auth.register(this.userDetail).subscribe(
      res => {
        this.router.navigate(['/picture'], { state: { username: this.userDetail.username } });
        //window.alert(res.result);
        console.log(res.result);
        if (res.result == 'new user added'){
        this.showNotification('success', 'Registration success');
        }
        else {
          this.showNotification('success', 'user exists already..do you want to update??');
        }
      },
      err => {
        //window.alert('User registration FAILURE');
        console.error(err);
        this.showNotification('failure', 'Registration failed');
      }
    );
  }
  //Getting user location:::current location
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.userDetail.location = [this.lat, this.lng];
          console.log(this.lat);
          console.log(this.lng);
          //return this.userDetail.location;
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  //Getting user location using user inputs:::
  setLocation(form: NgForm) {
    this.userDetail.location[0] = form.value.latitude;
    this.userDetail.location[1] = form.value.longitude;
    console.log(this.userDetail.location);
  }

  // latitude:number;
  // longitude:number;

  // setCenter(e: any){
  //   e.preventDefault();
  //   this.map.setCenter(new google.maps.LatLng(this.lat, this.lng));
  // }

}

