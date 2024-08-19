import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/identity/User';
import { UserUpdate } from '@app/models/identity/UserUpdate';
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

  public logout(): void{
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.currentUserSource.complete();
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

  public setCurrentUser(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  public getUser():Observable<UserUpdate>{
    return this.http.get<UserUpdate>(this.baseUrl+'getUser').pipe(take(1));
  }

  public updateUser(model: UserUpdate): Observable<void>{
    return this.http.put(this.baseUrl+'updateUser', model).pipe(
      take(1), 
      map(
        (user:UserUpdate) => {
          this.setCurrentUser(user);
        } 
      )
    );
  }

}
