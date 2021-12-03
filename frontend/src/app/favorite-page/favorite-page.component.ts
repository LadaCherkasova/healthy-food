import { Component } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'favourite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent {
  favorites: any = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoritesService
      .getFavorites()
      .subscribe(res => this.favorites = res);
  }
}
