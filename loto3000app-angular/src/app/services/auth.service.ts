import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  userSubject$ = new Subject<User>();
  userRole$ = new Subject<string>();
  
  constructor(private http:HttpClient, 
    private jwtHelper:JwtHelperService) {
      
    }

  readonly baseUrl = environment.apiBaseUrl;


  authenticateUser():boolean{
    const token = localStorage.getItem("jwt");

    if(token && !this.jwtHelper.isTokenExpired(token)){
      //console.log("authenticate " + token && !this.jwtHelper.isTokenExpired(token));
      return true;
    }
    return false;
  }


  getUserId():string|null{
    const token = localStorage.getItem("jwt");
    if(token){
      const decodeToken = this.jwtHelper.decodeToken(token);
      //console.log("1.GET USER ID: decode token" + typeof(decodeToken.nameid) + " " + decodeToken.nameid);
      return decodeToken.nameid.toString();

    }
    return null;
    
  }

  getCurrentUser(id:string | null){
    this.http
    .get<User>(`${this.baseUrl}/user/${id}`)
    .subscribe((result) => {
      //console.log("2:GET CURRENT USER: ROLE BEFORE ADDING THE ROLE" + result.role);
      this.userSubject$.next(result);

    },
    (error:any) => {
      console.log(error);

    })}

  getUserRole(){
    this.http
    .get(`${this.baseUrl}/user/role`)
    .subscribe((result) => {
      //console.log("3: GET USER ROLE" + result);
      this.userRole$.next(result.toString());

    },
    (error:any) => {
      console.log(error);
    })
  }


  
    
  
    
 
  
    
  

}
