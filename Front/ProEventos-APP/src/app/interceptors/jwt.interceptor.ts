import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { /*inject,*/ Injectable } from '@angular/core';
import { User } from '@app/models/identity/User';
import { AccountService } from '@app/services/account.service';
import { Observable, /*switchMap, switchMapTo,*/ take } from 'rxjs';
// import { HttpInterceptorFn } from '@angular/common/http';

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
// export const JwtInterceptor: HttpInterceptorFn = (req, next) => {// há priblema na implementação do app-module. não reconhece a proriedade com useValue.
//   const accountService = inject(AccountService);
  
//   return accountService.currentUser$.pipe(
//     take(1),
//     switchMap((currentUser:User)=>{
//       if(currentUser){
//         req = req.clone({
//           setHeaders:{
//             Authorization: `Bearer ${currentUser.token}`
//           }
//         });
//       }
//       return next(req);
//     }
//   ));
// };