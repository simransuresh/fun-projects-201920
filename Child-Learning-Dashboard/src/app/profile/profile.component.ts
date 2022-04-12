import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule, Sanitizer } from '@angular/core';
import { AuthService, UserDetails } from '../auth.service'
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
//import { DomSanitizer, SafeResourceUrl, SafeUrl  } from '@angular/platform-browser';

@Component({
  //selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userdetails = {
    username: ''
  };

  userInfo = {
    name: '',
    username: '',
    active: false,
    image: '',
    imagePath: 'assets/'
  };

  status: string;
  // domSanitizer : DomSanitizer;
  //  imageUrl : SafeResourceUrl;
  // trustedUrl: SafeUrl;
  imageSet = 0;
  typeOfUser = '';

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  constructor(private http: HttpClient, private router: Router, private notifier: NotifierService, private auth: AuthService) {
    //this.userdetails.username = this.router.getCurrentNavigation().extras.state.username;
    //console.log(this.router.getCurrentNavigation().extras.state.username);

    //Removed above and added this for profile url display::
    this.userdetails.username = localStorage.getItem('username');

    this.http.post('http://localhost:5000/user/isactive', this.userdetails).subscribe(
      (res: any) => {
        console.log(res.result);
        if (res.result == true) {
          this.http.post('http://localhost:5000/users/info', this.userdetails).subscribe(
          (res: any) => {
        console.log(res);
        this.userInfo.name = res.result.name;
        this.userInfo.username = res.result.username;
        this.userInfo.active = res.result.active;
        this.userInfo.image = res.result.image;
        this.userInfo.imagePath += this.userInfo.image;
        this.imageSet = 1;
        this.typeOfUser = 'user';
        console.log(this.userInfo.imagePath);
        if (this.userInfo.active == true) {
          this.status = 'YES';
        } else {
            this.status = 'NO';
        }
        this.showNotification('success', 'User info display success');
      },
      err => {
        console.log(err);
        this.showNotification('failure', 'User info display failed');
      }
    );
    }
          //showUser();
        else {
          console.log('User is inactive');
          this.router.navigateByUrl('/');
          this.auth.logout();
          console.log('User logged out');
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
 }
  ngOnInit() {
  }


}
