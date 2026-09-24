import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from './auth-state';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthState);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthState);
  const router = inject(Router);
  return auth.isAdmin() ? true : router.createUrlTree(auth.isLoggedIn() ? ['/'] : ['/login']);
};