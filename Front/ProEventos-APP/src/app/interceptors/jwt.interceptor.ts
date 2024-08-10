import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/identity/User';
import { AccountService } from '@app/services/account.service';
import { Observable, take } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let currentUser : User;
    this.accountService.currentUser$.pipe(take(1)).subscribe((user: User)=> {
      currentUser= user

      if(currentUser){
        request = request.clone({
          setHeaders:{
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
    });  

    return next.handle(request);
  }

  
  
};
