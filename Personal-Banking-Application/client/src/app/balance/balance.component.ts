import { Component, OnInit } from '@angular/core';
import { AuthService, UserDetails, Balances } from '../auth.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  details: UserDetails
  name: string
  
  requestPayload = {
    name: ''
  }

  public responsePayload = {
    username: '',
    balance: 0
  }

  constructor(private auth:AuthService, private http:HttpClient) {
    this.requestPayload.name = this.auth.getName()
    console.log(this.requestPayload.name)
    this.http.post('/users/balance',this.requestPayload).subscribe(
      resp=>{
            this.responsePayload.username = resp["username"]
            this.responsePayload.balance = resp["balance"]
            console.log(resp)
    },
      err=> {console.log(err)}
    ) 
   }

  ngOnInit() { 
    
  }


}
