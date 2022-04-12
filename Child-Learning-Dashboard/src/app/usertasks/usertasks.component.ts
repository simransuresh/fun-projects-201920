import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-usertasks',
  templateUrl: './usertasks.component.html',
  styleUrls: ['./usertasks.component.scss']
})
export class UsertasksComponent implements OnInit {
  results: any;
  UserDetails = {
    username: ''
  };
  result: any;

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }
  constructor(private router: Router, private http: HttpClient, private notifier: NotifierService) {
    console.log(localStorage.getItem('username'));
    this.UserDetails.username = localStorage.getItem('username');
    console.log(this.UserDetails.username);

    this.http.post('http://localhost:5000/users/viewassignedtasks', this.UserDetails).subscribe(
        (res: any) => {
          //console.log(res.result);
          this.results = res.result;
          this.showNotification('success','Assigned tasks displayed');
        },
        err => {
          console.log(err);
          this.showNotification('failure','Assigned tasks display failed');
        });
   }

  ngOnInit() {
  }

}
