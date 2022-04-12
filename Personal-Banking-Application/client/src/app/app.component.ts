import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Thrifty';
  constructor(public auth: AuthService) {}
  
}
