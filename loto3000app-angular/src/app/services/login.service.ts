import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http:HttpClient, 
    private router:Router,
    private toastr:ToastrService) { }

  readonly baseUrl = environment.apiBaseUrl;

  loginUser(username:string, password:string){
    this.http
    .post(`${this.baseUrl}/login`, {username,password}, {responseType:'text'})
    .subscribe((response) => {
      console.log('from login: '+ response);
      localStorage.setItem("jwt", response);
      this.router.navigate(['dashboard/info']);
    },
    (error) => {
      console.log(error);
      this.toastr.error("Incorrect username or password");
    })
  }

  




}
