import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
email = '';
password = '';
  constructor(
    private loginRouter : Router,
    private http: HttpClient
    ) { }

  ngOnInit() {
  }
  onclick(){
    let login = {
      username: this.email,
      password: this.password
    }
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }),
      withCredentials: false
    };

    this.http.post('http://localhost:3000/users/login', login, options).subscribe((res)=>{
      if(res['status'] === 'success') {
        localStorage.setItem('token',res['token']);
        if(res['data'].role === 'ADMIN') {
          this.loginRouter.navigate(['admin']);
        } else {
          this.loginRouter.navigate(['users']);
        }
      } 
    },
    err => {
      alert(err.error.message);
    });
  }
}
