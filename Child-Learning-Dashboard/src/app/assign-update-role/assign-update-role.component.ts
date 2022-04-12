import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-assign-update-role',
  templateUrl: './assign-update-role.component.html',
  styleUrls: ['./assign-update-role.component.scss']
})
export class AssignUpdateRoleComponent implements OnInit {
  queryInfo = {
    username: '',
    user: '',
    role: ''
  };
  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }
  constructor(private http: HttpClient, private router: Router, private notifier: NotifierService) {
    this.queryInfo.username = localStorage.getItem('username');
  }

  ngOnInit() {
  }
  assignRole(assignrole: NgForm) {
    this.queryInfo.user = assignrole.value.user;
    //let roletoassign = assignrole.value.role;
    if (assignrole.value.role == 'login') {
      this.queryInfo.role = 'login';
    }
    if (assignrole.value.role == 'profile') {
      this.queryInfo.role = 'profile';
    }
    if (assignrole.value.role == 'upload') {
      this.queryInfo.role = 'upload';
    }
    console.log(this.queryInfo);

    this.http.post('http://localhost:5000/users/assignroles', this.queryInfo).subscribe(
      res => {
        //this.router.navigate(['/propic'], { state: { username: this.userDetail.username } });
        // window.alert(res.result);
        console.log(res);
        this.showNotification('success','Assign role to user SUCCESS');
      },
      err => {
        // window.alert('User registration FAILURE');
        console.error(err);
        this.showNotification('failure','Assign role to user failed');
      }
    );
  }

  removeRole(removerole: NgForm) {
    this.queryInfo.user = removerole.value.user;
    //let roletoassign = assignrole.value.role;
    if (removerole.value.role == 'login') {
      this.queryInfo.role = 'login';
    }
    if (removerole.value.role == 'profile') {
      this.queryInfo.role = 'profile';
    }
    if (removerole.value.role == 'upload') {
      this.queryInfo.role = 'upload';
    }
    console.log(this.queryInfo);

    this.http.post('http://localhost:5000/users/removeroles', this.queryInfo).subscribe(
      res => {
        //this.router.navigate(['/propic'], { state: { username: this.userDetail.username } });
        // window.alert(res.result);
        console.log(res);
        this.showNotification('success','removed role to user SUCCESS');
      },
      err => {
        // window.alert('User registration FAILURE');
        console.error(err);
        this.showNotification('failure','remove role to user failed');
      }
    );
  }

}
