 import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'rxjs';
import { AuthService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  //selector: 'app-register',
  templateUrl: './register.component.html',
  //styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  //regDetails = {email:'',password:''}

  Creds : TokenPayload = {
    id: 0,
    name: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {}

  // regSubmit(regDetails: NgForm){
  //   //this.regDetails.name = regDetails.value.name;
  //   this.regDetails.email = regDetails.value.email;
  //   this.regDetails.password = regDetails.value.password;

  // console.log(this.regDetails);
  // }

  regSubmit(regDetails:NgForm){
    this.Creds.name = regDetails.value.name;
    this.Creds.email = regDetails.value.email;
    this.Creds.password = regDetails.value.password;

    this.auth.register(this.Creds).subscribe(
      res=> {this.router.navigateByUrl('/login')},
      err=> {console.error(err)}
    )
  }

}
