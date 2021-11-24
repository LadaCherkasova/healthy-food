import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { AuthQuery } from '../services/auth.query';

@Component({
  selector: 'recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent {
  readonly isLogged$ = this.authQuery.isLogged$;

  recipe: any = {};

  ingredients: any = [];

  steps: any = [];

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private authQuery: AuthQuery,
    ) {
    const parts = this.router.url.split('/');
    const recipeId = parseInt(parts[parts.length - 1]);

    this.recipesService
      .getCertainRecipe(recipeId)
      .subscribe(res => {
        this.recipe = res.recipe;
        this.ingredients = res.ingredients;
        this.steps = res.steps;
      });
  }
}


