import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePageComponent } from './recipe-page.component';


@NgModule({
  declarations: [RecipePageComponent],
  imports: [CommonModule],
  exports: [RecipePageComponent],
})
export class RecipePageModule {}
