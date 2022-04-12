import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, TokenPayload, UserDetails, IncomePayload, Balances } from '../auth.service';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  details: UserDetails

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit() {
    this.details = this.auth.getUserDetails()
  }

  incomeDetails: IncomePayload = {
    name: '',
    income: 0,
    source: ''
  }
   
  addIncome(incomeDetails: NgForm){
    //this.incomeDetails.name = this.auth.getUserDetails.name;
    this.incomeDetails.name = this.auth.getName();
    this.incomeDetails.income = incomeDetails.value.income;
    this.incomeDetails.source = incomeDetails.value.source;
    
    this.auth.addIncome(this.incomeDetails).subscribe(
      res=> {
        console.log(res["balance"])
        this.router.navigateByUrl('/balance')
      },
      err=> {console.error(err)}
    )
  }
 
}
