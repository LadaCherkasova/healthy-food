import { NgModule } from '@angular/core';
import { AddRecipePageComponent } from './add-recipe-page.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipe } from './safe-url.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [AddRecipePageComponent, SafeUrlPipe],
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  exports: [AddRecipePageComponent],
  providers: [SafeUrlPipe],
})
export class AddRecipePageModule {}
