import { inject } from "@angular/core";
import { User } from "@app/models/identity/User";
import { AccountService } from "@app/services/account.service";

export class Helpers {
    // not working correcly. Any class calling this method
    public static setCurrentUser():void{
        const accountService = inject(AccountService);
        let user: User;
        if(localStorage.getItem('user')) user = JSON.parse(localStorage.getItem('user') ?? "");
        else user =null;
        
        if(user) accountService.setCurrentUser(user);
      }
}
