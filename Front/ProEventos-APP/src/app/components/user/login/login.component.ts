import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '@app/models/identity/UserLogin';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  // Reactive forms não está sendo usando
  // loginForm! : FormGroup;
  // get LFormItem():any{
  //   return this.loginForm.controls;
  // }
  // public validation(){
  //   this.loginForm = this.fb.group({
  //     login:['', [Validators.required]],
  //     password:['', [Validators.required]]
  //   });
  // }
  constructor(
      // private fb : FormBuilder,
      private accountService : AccountService,
      private toastr: ToastrService,
      private router : Router
  ) { }

  model = {} as UserLogin;
  
  public login(): void{
    this.accountService.login(this.model).subscribe(
      ()=> { this.router.navigateByUrl('/dashboad'); },
      (error:any) => {
        if(error.status == 401){
          this.toastr.error('Usuário ou senha inválido');
        }else{
          console.error(error);
        }
      }
    );
  } 

  ngOnInit():void{
    // this.validation();
  }


}
