import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorFields } from '@app/helpers/ValidatorFild';
import { User } from '@app/models/identity/User';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,  
    private router: Router,
    private accountService: AccountService
  ) { }
  
  registrationForm! : FormGroup;
  user = {} as User;

  get RFormItem() : any{
    return this.registrationForm.controls;
  }
  
  ngOnInit(): void {
    this.validation();
  }

  public validation():void{

    const formOptions:AbstractControlOptions = {
      validators : ValidatorFields.MustMatch('password', 'passConfirm')
    };

    this.registrationForm = this.fb.group({
      primeiroNome:['', [Validators.required, Validators.maxLength(20)]],
      ultimoNome:['', [Validators.required, Validators.maxLength(50)]],
      email:['', [Validators.required, Validators.email]],
      userName :['', [Validators.required, Validators.maxLength(20)]],
      password:['',[Validators.required, Validators.minLength(4)]],
      passConfirm:['', [Validators.required]],
      terms:['',[Validators.required]]
    }, formOptions);
  }

  register(): void{
    this.user = { ... this.registrationForm.value}
    this.accountService.register(this.user).subscribe(
      () => this.router.navigateByUrl('/dashboard'),
      (error: any)=> {
        this.toastr.error(error.error);
        console.error(error);
      }
    );
  }

}
