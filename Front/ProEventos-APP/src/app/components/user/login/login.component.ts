import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private fb : FormBuilder) { }
  
  loginForm! : FormGroup;

  get LFormItem():any{
    return this.loginForm.controls;
  }

  ngOnInit():void{
    this.validation();
  }

  public validation(){
    this.loginForm = this.fb.group({
      login:['', [Validators.required]],
      password:['', [Validators.required]]
    });
  }

}
