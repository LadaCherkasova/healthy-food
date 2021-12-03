import { Component } from '@angular/core';
import { ModerationService } from '../services/moderation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent {
  readonly ingredientControl = new FormControl();

  constructor(private moderationService: ModerationService, private dialogRef: MatDialogRef<IngredientDialogComponent>) {}

  sendIngredient(): void {
    this.moderationService
      .sendIngredientForModeration(this.ingredientControl.value)
      .subscribe();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
