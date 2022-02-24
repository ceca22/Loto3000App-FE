import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, 
    private router:Router ) { }


  readonly baseUrl = environment.apiBaseUrl;

  registerUser(firstName:string, lastName:string, 
    username:string, password:string, confirmedPassword:string){
    this.http
    .post(`${this.baseUrl}/register`, {firstName, lastName, 
      username, password, confirmedPassword}, {responseType:'text'})
    .subscribe((response) => {
      console.log(response);
      this.router.navigate(['']);
    },
    (error) => {
      console.log(error);
    })
  }

  logoutUser(){
    localStorage.removeItem('jwt');
    this.router.navigate(['']);

  }

  // updateUser(user:User){
  //   const updatedUser:User = {
  //     id:user.id, 
  //     role:user.role, 
  //     firstName:user.firstName, 
  //     lastName:user.lastName, 
  //     username:user.username, 
  //     password:user.password, 
  //     confirmedPassword:user.confirmedPassword
  //   }
  //   this.http
  //   .put(`${this.baseUrl}/user`, updatedUser, {responseType:'text'})
  //   .subscribe((response) => {
  //     console.log(response);
  //     this.router.navigate(['']);
  //   },
  //   (error) => {
  //     console.log(error);
  //   })
  //   // return this.http.put(`${this.baseUrl}/user/${this.updateData}`, this.updateData)

  // }

  

}
