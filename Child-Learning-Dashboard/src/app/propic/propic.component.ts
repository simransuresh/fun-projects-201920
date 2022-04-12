import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDetails, AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {  FormControl , ReactiveFormsModule } from '@angular/forms';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-propic',
  templateUrl: './propic.component.html',
  styleUrls: ['./propic.component.scss']
})
export class PropicComponent implements OnInit {
  userDetail: UserDetails;
  userName: UserDetails['username'];
  //uploadedFile: any ;
  uploadForm: FormGroup;
  imageSrc: any;

  selectedFile: File = null;
  uploadedPercentage = 0;
  showMessage = false;
  message: String = '';

  public showNotification( type: string, message: string ): void {
	  this.notifier.notify( type, message );
  }

  constructor(private auth: AuthService, private router: Router, private slimLoadingBarService: SlimLoadingBarService,
    private http: HttpClient, private formBuilder: FormBuilder, private notifier: NotifierService) {
      this.userName = this.router.getCurrentNavigation().extras.state.username;
      console.log(this.userName);
      //this.userName = localStorage.getItem('username');
      //console.log(this.userName);
     }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);

    }
  }

  onSubmit() {
    const formData = new FormData();
    this.showMessage = false;
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('username', this.userName);

    this.http.post('http://localhost:5000/upload', formData, {
      reportProgress: true, observe: 'events'
    }).subscribe(
      (event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.slimLoadingBarService.start();
          console.log(this.uploadedPercentage);
          break;
        case HttpEventType.Response:
          this.slimLoadingBarService.complete();
          this.message = "Uploaded Successfully";
          console.log('File uploaded successfully');
          console.log(this.uploadedPercentage);
          //this.router.navigateByUrl('/profile');
          this.showNotification('success','File uploaded success');
          this.router.navigate(['/login'], { state: { username: this.userName } });
          this.showMessage = true;
          break;
        case 1: {
          console.log(this.uploadedPercentage);
          if (Math.round(this.uploadedPercentage) !== Math.round(event['loaded'] / event['total'] * 100)) {
            this.uploadedPercentage = event['loaded'] / event['total'] * 100;
            this.slimLoadingBarService.progress = Math.round(this.uploadedPercentage);
          }
          break;
        }
      }
      // this.showNotification('success', 'File uploaded success');
    }, //(res: any) => {
      //console.log(res.result);
      // if (res.result == 'permission denied for uploading pic...')
      //   this.showNotification('failure', 'permission denied for uploading pic...');
      // if (res.result == 'Upload pic is SUCCESS...')
      //   this.showNotification('success', 'file upload success');
    //},
      (error: any) => {
      console.log(error);
      this.message = "Image upload failure..Please try again";
      this.showMessage = true;
      this.slimLoadingBarService.reset();
      this.showNotification('failure', 'permission denied for uploading pic...');
    });
    //this.showNotification('success', 'File uploaded success');
  }


}
