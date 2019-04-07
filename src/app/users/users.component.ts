import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  id = '';
  candidateName = '';
  votingCount : Number;
  hasVoted = false;
  parties = [];
    constructor(
      private usersRouter : Router,
      private http: HttpClient
      ) { }

  ngOnInit() {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH',
        'Authorization': localStorage.getItem('token')
      }),
      withCredentials: false
    };

    this.http.get('http://localhost:3000/candidate/getCandidates', options).subscribe((res)=>{
      this.parties = res['data'];
    });
  }
  onClick(val){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH',
        'Authorization': localStorage.getItem('token')
      }),
      withCredentials: false
    };

    let vote = {
      id: val 
    };
    this.http.put('http://localhost:3000/candidate/vote', vote, options).subscribe((res)=>{
      this.hasVoted = true;
      alert('Voted successfully');
    });
  }

  logout() {
    localStorage.clear();
    this.usersRouter.navigate(['']);
  }

}
