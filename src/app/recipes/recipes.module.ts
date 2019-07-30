import {NgModule} from '@angular/core';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesComponent} from './recipes.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {recipeReducer} from './store/recipe.reducer';
import {EffectsModule} from '@ngrx/effects';
import {RecipeEffects} from './store/recipe.effects';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
        StoreModule.forFeature('recipes', recipeReducer),
        EffectsModule.forFeature([RecipeEffects])
    ]
})
export class RecipesModule {

}
