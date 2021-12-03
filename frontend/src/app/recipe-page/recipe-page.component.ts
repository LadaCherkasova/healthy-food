import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { AuthQuery } from '../services/auth.query';
import { AuthStore } from '../services/auth.store';
import { FavoritesService } from '../services/favorites.service';
import { ModerationService } from '../services/moderation.service';

@Component({
  selector: 'recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {
  readonly isLogged$ = this.authQuery.isLogged$;

  readonly isAdmin$ = this.authQuery.isAdmin$;

  recipe: any = {};

  ingredients: any = [];

  steps: any = [];

  isFavorite: boolean;

  isModerated: boolean;

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private authQuery: AuthQuery,
    private authStore: AuthStore,
    private favoritesService: FavoritesService,
    private moderationService: ModerationService,
  ) {}

  ngOnInit(): void {
    const parts = this.router.url.split('/');
    const recipeId = parseInt(parts[parts.length - 1]);

    this.recipesService
      .getCertainRecipe(recipeId)
      .subscribe(res => {
        this.recipe = res.recipe;
        this.ingredients = res.ingredients;
        this.steps = res.steps;
        this.isModerated = res.recipe?.recipe_ismoderated;
      });

    if (this.authStore.getValue().isLogged) {
      this.favoritesService
        .isFavorite(recipeId)
        .subscribe(res => {
          this.isFavorite = res;
        });
    }
  }

  toggleFavorite(): void {
    this.favoritesService
      .toggleFavorite(this.recipe.recipe_id)
      .subscribe();
    this.isFavorite = !this.isFavorite;
  }

  approveRecipe(): void {
    this.moderationService
      .approveModeratedRecipe(this.recipe.recipe_id)
      .subscribe();
    this.router.navigateByUrl('moderation');
  }

  declineRecipe(): void {
    this.moderationService
      .declineModeratedRecipe(this.recipe.recipe_id)
      .subscribe();
    this.router.navigateByUrl('moderation');
  }
}


