import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  
  currentUser:User;
  userSubscription:Subscription;
  userRoleSubscription:Subscription;

  private currentUserSubject = new BehaviorSubject<User>(new User());
  currentUserObservable = this.currentUserSubject.asObservable();



  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  initSubscriptionsCurrentUser(){
   const userId = this.auth.getUserId();
    this.auth.getCurrentUser(userId);
    this.userSubscription = this.auth.userSubject$.subscribe(
      (payload:User) => {
        this.currentUser = payload;
        this.initSubscriptionsUserRole();
        this.currentUserSubject.next(this.currentUser);

  
      })
    
  }

  initSubscriptionsUserRole(){
    this.auth.getUserRole();
    this.userRoleSubscription = this.auth.userRole$.subscribe(
      (payload:string)=>{
        console.log("3:USER ROLE SUBSCRIPTION RESULT: " + payload)
        this.currentUser.role = payload.toString();
      }
    )
  }
 

}
