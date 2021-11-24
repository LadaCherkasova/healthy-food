import { Routes } from '@angular/router';
import { FindPageComponent } from './find-page/find-page.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';


export const routes: Routes = [
  {
    path: '',
    component: FindPageComponent,
  },
  {
    path: 'favourite',
    component: FavouritePageComponent,
  },
  {
    path: 'recipe/:id',
    component: RecipePageComponent,
  },
  {
    path: 'create-recipe',
    component: AddRecipePageComponent,
  }
]
