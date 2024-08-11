import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/identity/User';
import { map, Observable, ReplaySubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  private currentUserSource = new ReplaySubject<User>(1);
  public currentUser$ = this.currentUserSource.asObservable();
  private baseUrl = environment.apiURL +'api/account/';

  public login( model:any):Observable<void>{
    return this.http.post<User>(this.baseUrl + 'login', model).pipe(
        take(1),
        map((response:User)=>{
          const user = response;
          if(user){
              this.setCurrentUser(user);
          }
        })
      );
  }

  public register( model:any):Observable<void>{
    return this.http.post<User>(this.baseUrl + 'register', model).pipe(
        take(1),
        map((response:User)=>{
          const user = response;
          if(user){
              this.setCurrentUser(user);
          }
        })
      );
  }

  public logout(): void{
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.currentUserSource.complete();
  }

  public setCurrentUser(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

}
