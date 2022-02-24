import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login: LoginService) { }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm():void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
    
  }

  onSubmitLogin() {   
    const {username, password} = this.loginForm.value;
    this.login.loginUser(username,password);
  }

  



}
