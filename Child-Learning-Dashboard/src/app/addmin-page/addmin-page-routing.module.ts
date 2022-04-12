import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AddminPageComponent } from './addmin-page.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: AddminPageComponent, children: [
    { path: '', component: ProfilePageComponent },
    { path: 'userprofile', component: UserProfileComponent}
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddminPageRoutingModule { }
