import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as authActions from './auth.actions';
import {from} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(authActions.TRY_SIGNUP),
        map(
            (action: authActions.TrySignUp) => {
                return action.payload;
            }
        ),
        switchMap(
            (authData: {username: string, password: string}) => {
                return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
            }
        ),
        switchMap(
            () => {
                return from(firebase.auth().currentUser.getIdToken());
            }
        ),
        mergeMap(
            (token: string) => {
                return [
                    {
                        type: authActions.SIGNUP
                    },
                    {
                        type: authActions.SET_TOKEN,
                        payload: token
                    }
                ];
            }
        )
    );

    @Effect()
    authSignIn = this.actions$.pipe(
        ofType(authActions.TRY_SIGNIN),
        map(
            (action: authActions.TrySignUp) => {
                return action.payload;
            }
        ),
        switchMap(
            (authData: {username: string, password: string}) => {
                return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
            }
        ),
        switchMap(
            () => {
                return from(firebase.auth().currentUser.getIdToken());
            }
        ),
        mergeMap(
            (token: string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: authActions.SIGNIN
                    },
                    {
                        type: authActions.SET_TOKEN,
                        payload: token
                    }
                ];
            }
        )
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(authActions.LOGOUT),
        tap(
            () => {
                this.router.navigate(['/']);
            }
        )
    );

    constructor(
        private actions$: Actions,
        private router: Router
    ) {
    }

}
