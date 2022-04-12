import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
   //Navigated from previous route:::
   userdetails = {
    username: ''
  };
  //To display admin profile:::
  adminInfo = {
    name: '',
    username: '',
    active: false,
    image: '',
    imagePath: 'assets/'
  };
  //To display users profile:::
  usersInfo = {
    username: '',
    active: false,
  };

  deleteUserInfo = {
    username: '',
    name: '',
  };

  status: string;
  imageSet = 0;
  typeOfUser = '';
  results: any;
  checked: boolean = false;
  result: any;
  sortedUsers: any;

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
  }

  constructor(private http: HttpClient, private router: Router , private notifier: NotifierService ) {
    //this.userdetails.username = this.router.getCurrentNavigation().extras.state.username;
    //console.log(this.router.getCurrentNavigation().extras.state.username);
    //localStorage.setItem('username', this.router.getCurrentNavigation().extras.state.username);

    //Added latest
    this.userdetails.username = localStorage.getItem('username');

      //Display users info::
    this.http.post('http://localhost:5000/users/admininfo', this.userdetails).subscribe(
        (res: any) => {
            console.log(res.result);
            this.results = res.result;
            this.showNotification('success', 'Admin info displayed' );
        },
        err => {
            console.log(err);
            this.showNotification('failure', 'Admin info failure' );
          }
      );
    }
    ngOnInit() {
    }

    showUserProfile(name) {
      this.router.navigate(['/adminprofile/userprofile'], { state: { username: name } });
    }

    //  activate(name, active) {
    //   this.usersInfo.username = name;
    //   if (active == true) {this.usersInfo.active = true;}
    //   if (active == false) {this.usersInfo.active = false;}
    //   //console.log(event);
    //   console.log(this.usersInfo);
    //   this.http.post('http://localhost:5000/user/activation', this.usersInfo).subscribe(
    //     res => {
    //       console.log(res);
    //       this.showNotification('success', 'User activated successfully');
    //       this.router.navigate(['/adminprofile/userprofile'], { state: { username: this.usersInfo.username } });
    //     },
    //     err => {
    //       console.log(err);
    //       this.showNotification('failure', 'User activated failed' );
    //     });
    // }

    //Checkbox function handling - new:::
    enableDisableUser(name, active) {
      this.usersInfo.username = name;
      if (active == true) {this.usersInfo.active = false;}
      if (active == false) {this.usersInfo.active = true;}
      //this.usersInfo.active = active;
      console.log(this.usersInfo);
      this.http.post('http://localhost:5000/user/activation', this.usersInfo).subscribe(
        res => {
          console.log(res);
          this.showNotification('success', 'User activated successfully');
          //this.router.navigate(['/adminprofile/userprofile'], { state: { username: this.activateInfo.username } });
        },
        err => {
          console.log(err);
          this.showNotification('failure', 'User activated failed' );
        });

      }

    deleteUser(name) {
      this.deleteUserInfo.username = localStorage.getItem('username');
      this.deleteUserInfo.name = name;
      this.http.post('http://localhost:5000/users/delete', this.deleteUserInfo).subscribe(
        (res: any) => {
          console.log(res);
          this.showNotification('success', 'user is deleted');
        },
        err => {
          console.log(err);
          this.showNotification('failure', 'user is not deleted');
        });
    }

    exportUsers() {
      const doc = new jsPDF();
      const head = ['Name', 'Username', 'Password', 'Type'];
      const body = [];
      // const headOptions = {
      //   0: {columnWidth: 50},
      //   1: {columnWidth: 'auto'},
      //   2: {columnWidth: 'wrap'},
      //   3: {columnWidth: 150}
      // };
      this.http.post('http://localhost:5000/users/admininfo', this.userdetails).subscribe(
        (res: any) => {
          console.log(res.result);
          res.result.forEach(element => {
            console.log(element.name);
            const temp = [element.name, element.username, element.password, element.usertype];
            console.log(temp);
            body.push(temp);
        });
          doc.autoTable({body});
          doc.save('Test.pdf');
          this.showNotification('success', 'user list exported');
        },
        err => {
          console.log(err);
          this.showNotification('failure', 'user list export failed');
        });
    }

    sortUsers() {
      let sortNames = [];
      this.http.post('http://localhost:5000/users/admininfo', this.userdetails).subscribe(
        (res: any) => {
          console.log(res.result);
          res.result.forEach(element => {
            sortNames.push(element.name);
            sortNames = sortNames.sort();
          });
          this.results = sortNames;
          console.log(this.results);
          console.log('Users list sorted....');
          this.showNotification('success', 'user list sorted');
        },
        err => {
          console.log(err);
          console.log('Sorting failed');
          this.showNotification('failure', 'user list sort failed');
        });
    }

    filterUsers(userfilter) {
      console.log(userfilter);
      this.http.post('http://localhost:5000/users/admininfo', this.userdetails).subscribe(
        (res: any) => {
          console.log(res.result);
          res.result.forEach(element => {
            //console.log(element.name);
            if (element.name == userfilter) {
              console.log('User found');
              this.showNotification('success', 'user is found');
              this.router.navigate(['/adminprofile/userprofile'], { state: { username: element.name } });
            }
          });
        },
        err => {
          console.log(err);
          console.log('filter failed');
          this.showNotification('failure', 'user not found');
        });
    }

}
