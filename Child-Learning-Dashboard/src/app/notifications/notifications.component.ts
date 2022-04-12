import { UserDetails } from './../auth.service';
import { LoginComponent } from './../login/login.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent implements OnInit {
  results: any;
  UserDetails = {
    username: ''
  }; //Only admin can get notifications - usertype - 1

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }
    constructor(private router: Router, private http: HttpClient, private notifier: NotifierService) {
      console.log(localStorage.getItem('username'));
      this.UserDetails.username = localStorage.getItem('username');
      console.log(this.UserDetails.username);
      //console.log(JSON.parse(localStorage.getItem('username')));

      this.http.post('http://localhost:5000/users/notifications', this.UserDetails).subscribe(
      (res: any) => {
        console.log(res);
        this.results = res.result;
        this.showNotification('success','Notifications of latest users displayed');
      },
      err => {
        console.log(err);
        this.showNotification('failure','Notifications failed to display');
      });
  }

  ngOnInit() {
  }

}
