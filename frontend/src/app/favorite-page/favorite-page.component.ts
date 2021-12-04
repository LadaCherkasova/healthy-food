import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'favourite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {
  showFavorites = true;

  favorites: any = [];

  ownRecipes: any = [];

  constructor(
    private favoritesService: FavoritesService,
    private recipesService: RecipesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.favoritesService
      .getFavorites()
      .subscribe(res => this.favorites = res);

    this.recipesService
      .getOwnRecipes()
      .subscribe(res => this.ownRecipes = res);
  }

  toggleTab(): void {
    this.showFavorites = !this.showFavorites;
  }

  openRecipe(id: number): void {
    this.router.navigateByUrl(`recipe/${id}`);
  }
}
