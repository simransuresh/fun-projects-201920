import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  results: any;
  UserDetails = {
    username: ''
  };
  tasks = {
    username: '',
    taskname: ''
  };
  public showNotification( type: string, message: string ): void {
	  this.notifier.notify( type, message );
  }
  constructor(private router: Router, private http: HttpClient, private notifier: NotifierService) {
    console.log(localStorage.getItem('username'));
    this.UserDetails.username = localStorage.getItem('username');
    console.log(this.UserDetails.username);
    //console.log(JSON.parse(localStorage.getItem('username')));

    this.http.post('http://localhost:5000/users/tasks', this.UserDetails).subscribe(
    (res: any) => {
      //console.log(res.result);
      this.results = res.result;
      this.showNotification('success','Task list displayed');
    },
    err => {
      console.log(err);
      this.showNotification('failure','Task list display failed');
    });

   }

  ngOnInit() {
  }

  assignTask(task) {
    this.tasks.username = localStorage.getItem('username');
    this.tasks.taskname = task;
    this.http.post('http://localhost:5000/users/assigntasks', this.tasks).subscribe(
      (res: any) => {
        console.log(res);
        //this.results = res.result;
        this.showNotification('success','Assign task success');
      },
      err => {
        console.log(err);
        this.showNotification('failure','Assign task failed');
      });
  }

  addNewTask(task) {
    this.tasks.username = localStorage.getItem('username');
    this.tasks.taskname = task;
    this.http.post('http://localhost:5000/users/addnewtask', this.tasks).subscribe(
      (res: any) => {
        console.log(res);
        this.results = res.result;
        this.showNotification('success','Add task success');
      },
      err => {
        console.log(err);
        this.showNotification('failure','Add task failed');
      });
  }

}
