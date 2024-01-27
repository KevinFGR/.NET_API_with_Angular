import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private router:Router){}

  isCollapsed:boolean = true;

  public showMenu():boolean{
    if(this.router.url == "/user/login" || this.router.url == "/user/registration"){
      return false;
    }
    return true;
  }

}
