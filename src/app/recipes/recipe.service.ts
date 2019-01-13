import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/6/60/Vegan_patties_with_potatoes_and_salad.jpg',
            [
                new Ingredient('Veggie Patty', 1),
                new Ingredient('Salad', 1)
            ]),
        new Recipe('Another Test Recipe',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/6/60/Vegan_patties_with_potatoes_and_salad.jpg',
            [
                new Ingredient('Veggie Patty', 1),
                new Ingredient('French Fries', 30)
            ]),
    ];

    constructor(private shoppingListService: ShoppingListService) {
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
