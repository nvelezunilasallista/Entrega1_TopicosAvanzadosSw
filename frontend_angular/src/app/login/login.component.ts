import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public idNumber : String = "";
  public password : String = "";
  public showError : boolean = false;

  constructor(private http : HttpClient, private router : Router){}

  ngOnInit() {

    var session = sessionStorage.getItem('token');

    if(session != null && session.trim() != ''){
      this.router.navigate(['/home']);
    }
  }

  public validateCredentials(){
    var url = "http://localhost:6542/api/loginUser";

    var headers = new HttpHeaders().set(
      'Content-Type', 'application/json'
    );

    var body = {
      'idNumber': this.idNumber,
      'password': this.password
    }

    this.http.post(url, body, {headers}).subscribe({
      next: (resp: any) => {
        var token = resp.token;

        sessionStorage.setItem('token', token);

        this.router.navigate(['/home']);

      },
      error: err =>{
        this.showError= true;
      }
    });
    
  }

  

}
