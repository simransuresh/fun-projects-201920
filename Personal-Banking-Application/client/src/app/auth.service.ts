import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails{
    id: number
    name: string
    email: string
    password: string
    exp: number
    iat: number
    balance: number
}

interface TokenResponse{
    token: string
}

export interface TokenPayload{
    id: number
    name: string
    email: string
    password: string
}

export interface IncomePayload{
    name: string,
    income: number,
    source: string
}

export interface ExpensePayload{
    name: string,
    expense: number,
    reason: string
}

export interface MoneyResponse{
    balance: number
    response: string
}

export interface Balances{
    name: string,
    balance: number
}

export interface Transactions{
    name: string,
    start_date: Date,
    end_date: Date
}

@Injectable()
export class AuthService{
    private token: string
    //private name: UserDetails
    private balance: number

    constructor(private http:HttpClient, private router:Router){}

    private setToken(token:string): void{
        localStorage.setItem('usertoken',token)
        this.token = token
    }

    private getToken(): string {
        if(!this.token){
            this.token = localStorage.getItem('usertoken')
        }
        return this.token
    }

    // public setBalance(balance: number): void {
    //     localStorage.set('balance',balance)
    //     this.balance = balance
    // }

    // public getBalance(): number {
    //     if(this.isLoggedIn){
    //         this.balance = localStorage.getItem('balance')
    //     }
    //     return this.balance
    // }

    public getName(): string {
        let name: string
        name = this.getUserDetails()["identity"]["name"]
        return name
    }
    public getUserDetails(): UserDetails {
        const token = this.getToken()
        //let name: string
        let payload :any
        if(token){
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        }
        else
            return null
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails()
        if(user)
            return user.exp > Date.now()/1000
        else
            return false
    }

    public register(user: TokenPayload): Observable<any> {
        return this.http.post('/users/register',user)
    }

    public login(user: TokenPayload): Observable<any> {
        const base = this.http.post('/users/login',user)
        const request = base.pipe(
            map((data: TokenResponse)=> {
                if(data.token)
                    this.setToken(data.token)
                return data
            })
        )
        return request
    }

    public logout(): void{
        this.token = ''
        window.localStorage.removeItem('usertoken')
        this.router.navigateByUrl('/')
    }

    public addIncome(income: IncomePayload): Observable<any>{
        const base = this.http.post('/users/income',income)
        const request = base.pipe(
            map((data: MoneyResponse)=>{
                console.log(data)
                if(data["balance"])                  
                    //this.getBalance(data["balance"])
                    //console.log(data["balance"])
                return data
            })
        )
        return request
    }

    public addExpense(expense: ExpensePayload): Observable<any>{
        const base = this.http.post('/users/expense',expense)
        const request = base.pipe(
            map((data: MoneyResponse)=>{
                console.log(data)
                return data
            })
        )
        return request
    }

    // public showBalance(name: string): Observable<any>{
    //     const base = this.http.post('/users/balance',name)
    //     const request = base.pipe(
    //         map((data: Balances)=>{
    //             console.log(data)
    //             //this.getUserDetails()["balance"] = data["balance"]
    //             return data
    //         })
    //     )
    //     return request
    // }


    public fetchTransactions(transaction: Transactions){
        this.http.post('/users/transactions',transaction)
    }

}
              










