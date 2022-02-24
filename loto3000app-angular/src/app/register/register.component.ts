import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  
  constructor(private userService: UserService) {
    console.log('hi from register');
   }

  
  ngOnInit(): void {
    this.initForm();

  }

  initForm():void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmedPassword: new FormControl('', Validators.required)

    });
  }

  onSubmitRegister() {
    const {firstName, lastName, username, password, confirmedPassword} = this.registerForm.value;
    this.userService.registerUser(firstName, lastName, username,password, confirmedPassword);
  }

}
