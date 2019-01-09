import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
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

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
}
