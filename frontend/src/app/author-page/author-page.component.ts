import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit {
  recipes: any = [];

  userName: string;

  constructor(private router: Router, private recipesService: RecipesService) {}

  ngOnInit(): void {
    const parts = this.router.url.split('/');
    const recipeId = parseInt(parts[parts.length - 1]);

    this.recipesService
      .getAuthorRecipes(recipeId)
      .subscribe(res => {
        this.recipes = res.recipes;
        this.userName = res.user_name.user_name;
      });
  }

  openRecipe(id: number): void {
    this.router.navigateByUrl(`recipe/${id}`);
  }
}
