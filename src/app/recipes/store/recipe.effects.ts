import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducer';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Recipe} from '../recipe.model';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipeEffects {

    @Effect()
    recipeFetch = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap(
            (action: RecipeActions.FetchRecipes) => {
                return this.http.get<Recipe[]>('https://angular-course-project-b3e67.firebaseio.com/recipes.json?',
                    {
                        observe: 'body',
                        responseType: 'json'
                    });
            }
        ),
        map(
            (recipes) => {
                console.log(recipes);
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                };
            }
        )
    );

    @Effect({dispatch: false})
    recipeStore = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(
            ([action, state]) => {
                const req = new HttpRequest('PUT', 'https://angular-course-project-b3e67.firebaseio.com/recipes.json',
                    state.recipes, {
                        reportProgress: true,
                        // params: new HttpParams().set('auth', token)
                    });
                return this.http.request(req);
            }
        )
    );

    constructor(private actions$: Actions,
                private http: HttpClient,
                private store: Store<fromRecipe.FeatureState>) {
    }
}
