import { Routes } from '@angular/router';
import { FindPageComponent } from './find-page/find-page.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';
import { AuthorizationGuard } from './authorization.guard';


export const routes: Routes = [
  {
    path: '',
    component: FindPageComponent,
  },
  {
    path: 'favorites',
    component: FavoritePageComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'recipe/:id',
    component: RecipePageComponent,
  },
  {
    path: 'create-recipe',
    component: AddRecipePageComponent,
    canActivate: [AuthorizationGuard],
  }
]
