import {RecipeService} from '../recipes/recipe.service';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';

@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://angular-course-project-b3e67.firebaseio.com/recipes.json', this.recipeService.getRecipes())
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
            );
    }

    getRecipes() {
        this.http.get('https://angular-course-project-b3e67.firebaseio.com/recipes.json')
            .pipe(
                map(
                    (response: Response) => {
                        const recipes : Recipe[] = response.json();
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
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}
