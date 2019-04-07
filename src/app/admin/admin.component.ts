import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    parties = [];
    constructor(
      private adminRouter : Router,
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

    this.http.get('http://localhost:3000/candidate/getCandidatesWithDetails', options).subscribe((res)=>{
      // debugger;
      console.log(res);
      this.parties = res['data'];
    });
  }

  logout() {
    localStorage.clear();
    this.adminRouter.navigate(['']);
  }

}
