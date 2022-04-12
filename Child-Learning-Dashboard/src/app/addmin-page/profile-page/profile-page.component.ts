import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserInfo } from 'src/app/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  //Navigated from previous route:::
  userdetails = {
    username: ''
  };
  //To display admin profile:::
  adminInfo: UserInfo = {
    name: '',
    username: '',
    active: false,
    image: '',
    imagePath: 'assets/'
  };
  //To display users profile:::
  usersInfo = {
    username: '',
    active: false
  };

  status: string;
  imageSet = 0;
  typeOfUser = '';
  results: any;
  checked: boolean = false;
  result: any;

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  constructor(private http: HttpClient, private router: Router , private notifier: NotifierService ) {
    // this.userdetails.username = this.router.getCurrentNavigation().extras.state.username;
    // console.log(this.router.getCurrentNavigation().extras.state.username);
    // localStorage.setItem('username', this.router.getCurrentNavigation().extras.state.username);

    //Added latest
    this.userdetails.username = localStorage.getItem('username');

    //Display admin info:
    this.http.post('http://localhost:5000/users/info', this.userdetails).subscribe(
    (res: any) => {
        console.log(res);
        this.adminInfo.name = res.result.name;
        this.adminInfo.username = res.result.username;
        this.adminInfo.active = res.result.active;
        this.adminInfo.image = res.result.image;
        this.adminInfo.imagePath += this.adminInfo.image;
        this.imageSet = 1;
        this.typeOfUser = 'admin';
        console.log(this.adminInfo.imagePath);
        if (this.adminInfo.active == true) {
          this.status = 'YES';
        } else {
            this.status = 'NO';
        }
        this.showNotification('success', 'User info display Success' );
      },
      err => {
        console.log(err);
        this.showNotification('failure', 'User info display failed' );
      }
    );

    }
    ngOnInit() {
    }


}
