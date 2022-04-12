
import { AddminPageComponent } from './addmin-page.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { AddminPageRoutingModule } from './addmin-page-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MenuComponent } from './menu/menu.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
@NgModule({
  declarations: [ProfilePageComponent, MenuComponent, AddminPageComponent, UserProfileComponent],
  imports: [
    CommonModule,
    AddminPageRoutingModule,
    FormsModule
  ]
})
export class AddminPageModule {
}


