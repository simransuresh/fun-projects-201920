import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, UserDetails, Transactions } from '../auth.service'
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  name: string
  response: any

  transactionPayload: Transactions = {
    name: '',
    start_date: new Date(),
    end_date: new Date()
  }

  ngOnInit(): void {}
  

  constructor(private auth: AuthService, private http: HttpClient) { }

   fetchTransactions(transactionDetails: NgForm) {
     this.transactionPayload.name = this.auth.getName()
     this.transactionPayload.start_date = transactionDetails.value.start_date;
     this.transactionPayload.end_date = transactionDetails.value.end_date;

     this.http.post('/users/transactions',this.transactionPayload).subscribe(
       resp=> {
         console.log(resp)
         console.log(resp["data"]["length"])
         console.log(resp["data"])
         this.response = resp["data"]
         console.log(typeof(this.response))
        //  for(let i=0;i<resp["data"]["length"];i++){
        // this.response = resp["data"][i]
        //  console.log(this.response)}
      },
       err=> {console.log(err)}
     )

   }

}
