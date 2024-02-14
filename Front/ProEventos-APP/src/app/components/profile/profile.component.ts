import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorFields } from '@app/helpers/ValidatorFild';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(private fb : FormBuilder) { }

  profileForm! : FormGroup;

  get PFormItem():any{
    return this.profileForm.controls;
  } 

  ngOnInit(): void {
    this.validation();
  }

  public validation():void{

    const formOptions : AbstractControlOptions = {
      validators: ValidatorFields.MustMatch('password', 'passConfirm')
    };

    this.profileForm = this.fb.group({
      FName:['', [Validators.required, Validators.maxLength(20)]],
      LName:['', [Validators.required, Validators.maxLength(50)]],
      email:['', [Validators.required, Validators.email]],
      number:['',[Validators.required]],
      password:['', [Validators.required, Validators.minLength(8)]],
      passConfirm:['', [Validators.required]]

    }, formOptions)
  }

}
