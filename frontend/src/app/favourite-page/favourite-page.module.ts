import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritePageComponent } from './favourite-page.component';
import { RecipePreviewModule } from '../recipe-preview/recipe-preview.module';


@NgModule({
  declarations: [FavouritePageComponent],
  imports: [CommonModule, RecipePreviewModule],
  exports: [FavouritePageComponent],
})
export class FavouritePageModule { }
