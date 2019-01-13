import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: []
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeListener: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeListener = this.recipeService.recipesChanged.subscribe((
        (recipes: Recipe[]) => {
            this.recipes = recipes;
        }
    ));
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.recipeListener.unsubscribe();
  }


}
