import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// import { MaterialModule } from './material/material.module';
// import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { AppComponent } from './app.component';

@NgModule({

declarations: [

AppComponent

],

imports: [

BrowserModule,
FormsModule,
MatSliderModule,
BrowserAnimationsModule,
// MaterialModule
// HttpClient,
// MaterialModule,
// MaterialModule.forRoot()
// BrowserAnimationsModule 

],

providers: [],

bootstrap: [AppComponent]

})

export class AppModule { }