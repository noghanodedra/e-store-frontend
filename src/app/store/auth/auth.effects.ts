import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import * as fromAuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.login),
        switchMap((payload: any) =>
          this.authService.doLogin(payload.username, payload.password)
        ),
        delay(1000),
        tap((resp) => {
          console.log(resp);
          this.cookieService.set('access', resp.accessToken, {
            sameSite: 'None',
            secure: true,
          });
          this.cookieService.set('refresh', resp.refreshToken, {
             sameSite: 'None',
             secure: true,
           });
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  checkauth$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromAuthActions.checkAuth),
      switchMap(() =>
        this.authService
          .checkAuth()
          .pipe(
            map((isLoggedIn: boolean) =>
              fromAuthActions.checkAuthComplete({ isLoggedIn })
            )
          )
      )
    )
  );

  checkAuthComplete$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromAuthActions.checkAuthComplete),
      switchMap(({ isLoggedIn }) => {
        console.log('checkAuthComplete: isLoggedIn', isLoggedIn);
        if (isLoggedIn) {
          return this.authService.userData.pipe(
            map((profile) =>
              fromAuthActions.loginComplete({ profile, isLoggedIn })
            )
          );
        }
        return of(fromAuthActions.logoutComplete());
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.logout),
      tap(() => this.authService.doLogout()),
      map(() => fromAuthActions.logoutComplete())
    )
  );

  logoutComplete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logoutComplete),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
