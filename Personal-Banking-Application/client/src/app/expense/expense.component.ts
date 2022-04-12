import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, TokenPayload, ExpensePayload, UserDetails } from '../auth.service';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  details: UserDetails

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit() {
    this.details = this.auth.getUserDetails()
  }

  expenseDetails: ExpensePayload = {
    name: '',
    expense: 0,
    reason: ''
  }

  addExpense(expenseDetails: NgForm){
    //this.incomeDetails.name = this.auth.getUserDetails.name;
    this.expenseDetails.name = this.auth.getName();
    this.expenseDetails.expense = expenseDetails.value.expense;
    this.expenseDetails.reason = expenseDetails.value.reason;
    
    this.auth.addExpense(this.expenseDetails).subscribe(
      res=> {
        console.log(res)
        this.router.navigateByUrl('/balance')
      },
      err=> {console.error(err)}
    )
  }
}
