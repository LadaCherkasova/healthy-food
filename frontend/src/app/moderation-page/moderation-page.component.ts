import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModerationService } from '../services/moderation.service';

@Component({
  selector: 'moderation-page',
  templateUrl: './moderation-page.component.html',
  styleUrls: ['./moderation-page.component.scss']
})
export class ModerationPageComponent implements OnInit {
  moderatedRecipes: any = [];

  moderatedIngredients: any = [];

  constructor(private moderationService: ModerationService, private router: Router) {}

  ngOnInit(): void {
    this.moderationService
      .getModeratedRecipes()
      .subscribe(res => this.moderatedRecipes = res);

    this.moderationService
      .getModeratedIngredients()
      .subscribe(res => this.moderatedIngredients = res);
  }

  openRecipe(id: number): void {
    this.router.navigateByUrl(`recipe/${id}`);
  }

  approveIngredient(ingredient: any): void {
    this.moderationService
      .approveModeratedIngredient(ingredient.ingredient_id)
      .subscribe();
    this.removeFromIngredients(ingredient);
  }

  declineIngredient(ingredient: any): void {
    this.moderationService
      .declineModeratedIngredient(ingredient.ingredient_id)
      .subscribe();
    this.removeFromIngredients(ingredient);
  }

  removeFromIngredients(ingredient: any): void {
    const index = this.moderatedIngredients.indexOf(ingredient);
    this.moderatedIngredients = this.moderatedIngredients.slice(0, index).concat(this.moderatedIngredients.slice(index + 1));
  }

  removeRecipe(recipe: any): void {
    const index = this.moderatedRecipes.indexOf(recipe);
    this.moderatedRecipes = this.moderatedRecipes.slice(0, index).concat(this.moderatedRecipes.slice(index + 1));
  }
}
