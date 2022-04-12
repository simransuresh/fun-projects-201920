import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, LoginDetails} from '../auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  //selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  //styleUrls: ['../../styles.scss']
})

export class LoginComponent implements OnInit {

    loginInfo: LoginDetails = {
    username: '',
    password: ''
  };
  display = 'none';
  //private notifier: NotifierService;

  constructor(private auth: AuthService, private router: Router, private notifier: NotifierService) {
    this.notifier = notifier;

   }

  ngOnInit() {}

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  loginSubmit(loginCred: NgForm) {
    this.loginInfo.username = loginCred.value.username;
    this.loginInfo.password = loginCred.value.password;
    localStorage.setItem('username', this.loginInfo.username);
    console.log(localStorage.getItem('username'));

    localStorage.setItem('status', 'true');
    console.log(localStorage.getItem('status'));

    this.auth.login(this.loginInfo).subscribe(
      res => {
        console.log(res);
        this.showNotification('success', res.result );

        if (res.usertype == 'user') {
        this.router.navigate(['/profile'], { state: { username: this.loginInfo.username } });
        }
        if (res.usertype == 'admin') {
        this.router.navigate(['/adminprofile'], { state: { username: this.loginInfo.username } });
        }
      },
      err => {
        this.showNotification('failure', 'Login failed' );
        console.error(err);
      }
    );
  }

}
