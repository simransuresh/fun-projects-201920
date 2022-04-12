import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { BalanceComponent } from './balance/balance.component';
import { TransactionsComponent } from './transactions/transactions.component';

const appRoutes: Routes = [
    {path: 'person', component: PersonComponent},
    {path:'', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]},
    {path: 'income', component: IncomeComponent},
    {path: 'expense', component: ExpenseComponent},
    {path: 'balance', component: BalanceComponent},
    {path: 'transactions', component: TransactionsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    IncomeComponent,
    ExpenseComponent,
    BalanceComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
