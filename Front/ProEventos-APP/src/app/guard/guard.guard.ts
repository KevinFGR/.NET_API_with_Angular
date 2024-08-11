import { inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService)

    if(localStorage.getItem('user') !=null)return true;

    toastr.info("Usuário não autenticado!");
    router.navigate(['/user/login']);
    return false;
};