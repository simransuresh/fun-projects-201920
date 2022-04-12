import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Welcome to Nidara !';
  useractive: any;
  isAdmin: any;
  constructor(public auth: AuthService) {
    //checks for whether user is logged in every time page loads:::
    if (localStorage.getItem('username') == null) {
      this.useractive = false;
    } else {
      this.useractive = true;
      if (localStorage.getItem('username') == 'admin') {
        this.isAdmin = true;
      } else { this.isAdmin = false; }
    }
  }
}
