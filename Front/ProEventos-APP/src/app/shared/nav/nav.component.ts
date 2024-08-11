import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private router:Router, public accountService:AccountService){}

  isCollapsed:boolean = true;

  public showMenu():boolean{
    if(this.router.url == "/user/login" || this.router.url == "/user/registration"){
      return false;
    }
    return true;
  }
  public logout(): void{
    this.accountService.logout();
    this.router.navigateByUrl('/user/login')
  }

}
