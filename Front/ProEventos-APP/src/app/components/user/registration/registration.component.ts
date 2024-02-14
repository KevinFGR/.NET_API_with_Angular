import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorFields } from '@app/helpers/ValidatorFild';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  constructor(private fb: FormBuilder) { }
  
  registrationForm! : FormGroup;

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
      FName:['', [Validators.required, Validators.maxLength(20)]],
      LName:['', [Validators.required, Validators.maxLength(50)]],
      email:['', [Validators.required, Validators.email]],
      user :['', [Validators.required, Validators.maxLength(20)]],
      password:['',[Validators.required, Validators.minLength(8)]],
      passConfirm:['', [Validators.required]],
      terms:['',[Validators.required]]
    }, formOptions);
  }

}
