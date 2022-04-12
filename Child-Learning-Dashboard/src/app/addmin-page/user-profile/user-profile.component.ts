import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserInfo } from 'src/app/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userdetails = {
    username: ''
  };

  userInfo: UserInfo = {
    name: '',
    username: '',
    active: false,
    image: '',
    imagePath: 'assets/'
  };

  status: string;
  imageSet = 0;
  typeOfUser = '';
  result: any;

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  constructor(private http: HttpClient, private router: Router, private notifier: NotifierService) {
    this.userdetails.username = this.router.getCurrentNavigation().extras.state.username;
    console.log(this.router.getCurrentNavigation().extras.state.username);

    //Removed above and added this for profile url display::
    //this.userdetails.username = localStorage.getItem('username');
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
        this.showNotification('success','User info display success');
      },
      err => {
        console.log(err);
        this.showNotification('failure', 'User info display failed');
      }
    );
  }

  ngOnInit() {
  }

}
