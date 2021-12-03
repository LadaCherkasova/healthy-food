import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthQuery } from '../services/auth.query';
import { FavoritesService } from '../services/favorites.service';
import { AuthStore } from '../services/auth.store';
import { ModerationService } from '../services/moderation.service';

@Component({
  selector: 'recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss']
})
export class RecipePreviewComponent implements OnInit {
  @Input()
  image: string;

  @Input()
  time: number;

  @Input()
  title: string;

  @Input()
  type: string;

  @Input()
  description: string;

  @Input()
  isFavorite: boolean;

  @Input()
  isVegan: boolean;

  @Input()
  recipeId: number;

  @Input()
  isModerated: boolean;

  @Output()
  hide = new EventEmitter<void>();

  readonly isLogged$ = this.authQuery.isLogged$;

  constructor(
    private authQuery: AuthQuery,
    private favoritesService: FavoritesService,
    private authStore: AuthStore,
    private moderationService: ModerationService,
  ) {}

  ngOnInit(): void {
    if (this.authStore.getValue().isLogged) {
      this.favoritesService
        .isFavorite(this.recipeId)
        .subscribe(res => {
          this.isFavorite = res;
        });
    }
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    this.favoritesService
      .toggleFavorite(this.recipeId)
      .subscribe();
    this.isFavorite = !this.isFavorite;
  }

  approveRecipe(event: Event): void {
    event.stopPropagation();
    this.moderationService
      .approveModeratedRecipe(this.recipeId)
      .subscribe();
    this.hide.emit();
  }

  declineRecipe(event: Event): void {
    event.stopPropagation();
    this.moderationService
      .declineModeratedRecipe(this.recipeId)
      .subscribe();
    this.hide.emit();
  }
}
