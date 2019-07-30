import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';


export interface FeatureState extends fromApp.AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
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
    ]
};


export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case RecipeActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }
}
