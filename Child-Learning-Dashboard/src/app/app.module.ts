
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AgmCoreModule } from '@agm/core';

import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
//import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PropicComponent } from './propic/propic.component';
//import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AssignUpdateRoleComponent } from './assign-update-role/assign-update-role.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsertasksComponent } from './usertasks/usertasks.component';
import { HomeComponent } from './home/home.component';
//import { TestComponent } from './test/test.component';
import { LocationComponent } from './location/location.component';
//import { AddminPageComponent } from './addmin-page/addmin-page.component';

const appRoutes: Routes = [
   {path: '', component: HomeComponent},
   {path: 'login', component: LoginComponent},
   {path: 'register', component: RegisterComponent},
   {path: 'picture', component: PropicComponent},
   {path: 'profile', component: ProfileComponent},
   {path:'adminprofile', loadChildren: './addmin-page/addmin-page.module#AddminPageModule'},
   //{path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  //  {path: 'adminprofile', component: AdminprofileComponent, children: [
  //    {path: 'profile', component: ProfileComponent}
  //  ]}
   //{path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
   {path: 'notifications', component: NotificationsComponent},
   {path: 'roleassign', component: AssignUpdateRoleComponent},
   {path: 'tasks', component: TasksComponent },
   {path: 'usertasks', component: UsertasksComponent},
   //{path: 'location', component: TestComponent},
   {path: 'location', component: LocationComponent},
];

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
     RegisterComponent,
     LoginComponent,
     PropicComponent,
     ProfileComponent,
     //AdminprofileComponent,
     NotificationsComponent,
     AssignUpdateRoleComponent,
     TasksComponent,
     UsertasksComponent,
     HomeComponent,
     //TestComponent,
     LocationComponent,
    // AddminPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    SlimLoadingBarModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
    AgmCoreModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
