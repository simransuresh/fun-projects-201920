import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';
 
@Component({
  //selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //loginCreds = {username:'',password:''}

  //constructor(private http: HttpClient) { }

  ngOnInit() {}

  Creds : TokenPayload = {
    id: 0,
    name: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthService, private router: Router) {}

  // loginSubmit(loginCred: NgForm){

  //   this.loginCreds.username = loginCred.value.username;
  //   this.loginCreds.password = loginCred.value.password;
  //   console.log(this.loginCreds);

  //   // this.http.post('http://localhost:5000/login',this.loginCreds)
  //   //   .subscribe(
  //   //       success=>{
  //   //         alert(success);
  //   //     },
  //   //     error=>{
  //   //       alert(error);
  //   //     }
  //   //   );
      
  // }

  loginSubmit(loginCreds: NgForm){
    this.Creds.email = loginCreds.value.email;
    this.Creds.password = loginCreds.value.password;
    
    this.auth.login(this.Creds).subscribe(
      res=> {this.router.navigateByUrl('/profile')},
      err=> {console.error(err)}
    )
  }

}
