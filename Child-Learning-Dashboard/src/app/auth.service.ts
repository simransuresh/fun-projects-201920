import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

export interface UserDetails {
    name: string;
    username: string;
    password: string;
    active: boolean;
    usertype: number;
    image: string;
    location: any;
    //exp: number;
}

export interface LoginDetails {
  username: string;
  password: string;
}

export interface UserInfo {
    name: string;
    username: string;
    active: boolean;
    image: string;
    imagePath: string;
}

interface TokenResponse{
  token: string;
}

export interface User {
  username: string;
  //name: string;
}

export class AuthService {
  private token: string;

    constructor(private http: HttpClient, private router: Router, private notifier: NotifierService
      ) { }

    // private setToken(token: string): void {
    //   localStorage.setItem('usertoken', token);
    //   this.token = token;
    // }
    // private getToken(): string {
    //   if (!this.token) {
    //       this.token = localStorage.getItem('usertoken');
    //   }
    //   return this.token;
    // }
    // public getName(): string {
    //   let name: string;
    //   name = localStorage.getItem('username');
    //   return name;
    // }
    // public getUserDetails(): UserDetails {
    //   const token = this.getToken();
    //   //let name: string
    //   let payload :any;
    //   if(token){
    //       payload = token.split('.')[1];
    //       payload = window.atob(payload);
    //       return JSON.parse(payload);
    //   }
    //   else
    //       return null;
    // }

    // public isLoggedIn(): boolean {
    //   const user = localStorage.getItem('username');
    //   if (user)
    //       return localStorage.getItem('timeout') > (Date.now()/1000)
    //   else
    //       return false;
    // }

  //Pushed code-------

  // public notifier: NotifierService;

  // public showNotification( type: string, message: string ): void {
	// 	this.notifier.notify( type, message );
  // }

    public register(user: UserDetails): Observable<any> {
        console.log(user);
        return this.http.post('http://localhost:5000/users/register', user);
    }

    public login(user: LoginDetails): Observable<any> {
      console.log(user);
      localStorage.setItem('username', user.username);
      localStorage.setItem('usertoken', user.username);
      //localStorage.setItem('logged_time', Date.now());
      return this.http.post('http://localhost:5000/users/login', user);
    }
    //---------Pushed code

    // public login(user: LoginDetails): Observable<any> {
    //   const base = this.http.post('http://localhost:5000/users/login', user)
    //   const request = base.pipe(
    //       map((data: TokenResponse)=> {
    //           if (data.token)
    //               this.setToken(data.token);
    //           return data;
    //       })
    //   )
    //   return request;
    // }
    private showNotification( type: string, message: string ): void {
		  this.notifier.notify( type, message );
      }

    public logout(): void {
      this.token = '';
      window.localStorage.removeItem('username');
      localStorage.removeItem('usertoken');
      //localStorage.removeItem('timeout');
      localStorage.clear();
      //this.router.navigateByUrl('/');
      this.showNotification('success', 'User Logged Out.');
      window.alert('User logged out');
    }

    // public isActive(user: User) {
    //   user.username = localStorage.getItem('username');
    //   //user.name = name;
    //   return this.http.post('http://localhost:5000/user/isactive', user);
    // }

}










