import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.reducer';
import {map, take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean | UrlTree {
        return this.store.select('auth').pipe(
            take(1),
            map(
                (authState: fromAuth.State) => {
                    return authState.authenticated;
                }
            )
        );
    }

    canLoad(route: Route, segments: UrlSegment[]):
        Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }
}
