import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePreviewComponent } from './recipe-preview.component';


@NgModule({
  declarations: [RecipePreviewComponent],
  imports: [CommonModule],
  exports: [RecipePreviewComponent],
})
export class RecipePreviewModule {}
