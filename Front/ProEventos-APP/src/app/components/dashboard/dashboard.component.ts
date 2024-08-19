import { Component } from '@angular/core';
import { User } from '@app/models/identity/User';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private accountService:AccountService){}
  public setCurrentUser():void{
    let user: User;
    if(localStorage.getItem('user')) user = JSON.parse(localStorage.getItem('user') ?? "");
    else user =null;
    
    if(user) this.accountService.setCurrentUser(user);
  }
  ngOnInit(){
    this.setCurrentUser();
  }
}
