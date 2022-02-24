import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  currentUserInfo:User;
  updateData:FormGroup;

  constructor(private auth:AuthService, 
    public userService:UserService, private sharedData:SharedDataService ) { }

  ngOnInit(): void {

    this.sharedData.currentUserObservable.subscribe(message => this.currentUserInfo = message);
    this.sharedData.initSubscriptionsCurrentUser();
  }
  
  //LOGOUT USER
  onSubmitLogout(){
    this.userService.logoutUser();
  }

  //SEND DATA

  

  //UPDATE USER INFO

  // initForm():void {
  //   this.updateData = new FormGroup({
  //     id: new FormControl('', Validators.required),
  //     role:new FormControl('', Validators.required),
  //     firstName: new FormControl('', Validators.required),
  //     lastName: new FormControl('' ,Validators.required),
  //     username: new FormControl('', Validators.required),
  //     password: new FormControl('', Validators.required),
  //     confirmedPassword: new FormControl('', Validators.required)

  //   });
  // }



  // onSubmitUpdate(form:NgForm){
  //   const {id, role, firstName, lastName, username, password, confirmedPassword} = this.updateData.value;
  //   const data:User = form.value;
  //   this.userService.updateUser(data);
  // }


  Update(){
    console.log(this.currentUserInfo);
  }


}
