import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorFields } from '@app/helpers/ValidatorFild';
import { AccountService } from '@app/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserUpdate } from '@app/models/identity/UserUpdate';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userUpdate = {} as UserUpdate;
  constructor(
    private fb : FormBuilder,
    public accountService:AccountService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  profileForm! : FormGroup;

  get PFormItem():any{
    return this.profileForm.controls;
  } 

  ngOnInit(): void {
    this.validation();
    this.loadUser();
  }

  onSubmit(): void{
    this.updateUser();
  }

  private loadUser():void{
    this.spinner.show();
    this.accountService.getUser().subscribe(
      (userReturn: UserUpdate)=>{
        this.userUpdate = userReturn;        
        this.profileForm.patchValue(this.userUpdate);
        this.toastr.success("User loaded", "Success");
      },
      (error)=>{ 
        console.error(error);
        this.toastr.error("User not loaded", "Error");
        this.router.navigate(['/dashboard']);
      },
      () => this.spinner.hide()
    );
  }

  private updateUser(){
    this.userUpdate = { ... this.profileForm.value};
    this.spinner.show();
    this.accountService.updateUser(this.userUpdate).subscribe(
      () => this.toastr.success('User updated', "Success"),
      (error) =>{ 
        console.error(error);
        this.toastr.error(error);

      },
      () => this.spinner.hide()
    );
  }

  public validation():void{

    const formOptions : AbstractControlOptions = {
      validators: ValidatorFields.MustMatch('password', 'passConfirm')
    };

    this.profileForm = this.fb.group({
      userName:[''],
      titulo:['Uninformed', [Validators.required]],
      primeiroNome:['', [Validators.required, Validators.maxLength(20)]],
      ultimoNome:['', [Validators.required, Validators.maxLength(50)]],
      email:['', [Validators.required, Validators.email]],
      descricao:['',[Validators.required]],
      funcao:['Uninformed',[Validators.required]],
      phoneNumber:['',[Validators.required]],
      password:['', [Validators.required, Validators.minLength(4)]],
      passConfirm:['', [Validators.required]]

    }, formOptions)
  }

}
