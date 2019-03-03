import {RecipeService} from '../recipes/recipe.service';
import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        // const token = this.authService.getToken();
        // return this.http.put('https://angular-course-project-b3e67.firebaseio.com/recipes.json',
        //     this.recipeService.getRecipes(), {
        //         observe: 'body',
        //         params: new HttpParams().set('auth', token)
        //     });
        const req = new HttpRequest('PUT', 'https://angular-course-project-b3e67.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(), {
                reportProgress: true,
                // params: new HttpParams().set('auth', token)
            });
        return this.http.request(req);
    }

    getRecipes() {
        // const token = this.authService.getToken();
        // this.http.get<Recipe[]>('https://angular-course-project-b3e67.firebaseio.com/recipes.json?auth=' + token)
        this.http.get<Recipe[]>('https://angular-course-project-b3e67.firebaseio.com/recipes.json?',
            {
            observe: 'body',
            responseType: 'json'
        })
            .pipe(
                map(
                    (recipes) => {
                        console.log(recipes);
                        for (let recipe of recipes) {
                            if (!recipe['ingredients']) {
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                )
            )
            .subscribe(
            (recipes) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}
