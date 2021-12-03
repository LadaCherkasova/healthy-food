import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { SettingsService } from '../services/settings.service';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.scss']
})
export class AddRecipePageComponent {
  @ViewChild('file')
  fileInput: ElementRef<HTMLInputElement>;

  readonly fileControl = new FormControl();

  readonly ingredientSearchControl = new FormControl();

  readonly ingredientAmountControl = new FormControl();

  readonly currentFileControl = new FormControl();

  readonly currentStepControl = new FormControl();

  recipe: any = {};

  ingredients: any = [];

  types: any = [];

  currentIngredients: any = [];

  currentIngredient = '';

  chosenIngredients: any = [];

  steps: any = [];

  showErrorText = false;

  constructor(
    private settingsService: SettingsService,
    private recipesService: RecipesService,
    private router: Router,
    private matDialog: MatDialog,
  ) {
    this.fileControl.valueChanges.pipe(
      tap(() => {
        const input = (document.getElementById('file') as HTMLInputElement);
        if (input.files) {
          this.getImage(input.files[0], this.recipe, 'preview');
        }
      })
    ).subscribe();

    this.currentFileControl.valueChanges.pipe(
      tap(() => {
        const input = (document.getElementById('currentFile') as HTMLInputElement);
        if (input.files) {
          this.getImage(input.files[0], this.recipe, 'currentStepPhoto');
        }
      })
    ).subscribe();

    this.settingsService
      .getAvailableIngredients()
      .subscribe((response) => {
        this.ingredients = response;
        this.currentIngredients = response
      });

    this.settingsService
      .getDishesTypes()
      .subscribe(response => this.types = response)

    this.ingredientSearchControl.valueChanges.pipe(
      tap((value) => {
        this.currentIngredients = this.ingredients.filter(
          ingredient => ingredient.ingredient_name.toLowerCase().includes(value.toLowerCase())
        )
      })
    ).subscribe();

    this.recipe.isVegan = false;
  }

  getImage(image, result: any, field: string): void {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
      result[field] = reader.result;
    }
  }

  addImage(id: string): void {
    (document.getElementById(id) as HTMLInputElement).click();
  }

  setCurrentIngredientName(event: Event): void {
    this.currentIngredient = (event.currentTarget as HTMLElement).innerText;
  }

  setCurrentIngredient(): void {
    const foundIngredient = this.chosenIngredients.find(
      ingredient => ingredient.name === this.currentIngredient
    );
    if (!foundIngredient) {
      this.chosenIngredients.push({
        name: this.currentIngredient,
        amount: this.ingredientAmountControl.value
      });
      this.deleteCurrentIngredient();
    }
  }

  deleteCurrentIngredient(): void {
    this.currentIngredient = '';
    this.ingredientSearchControl.setValue('');
    this.ingredientAmountControl.setValue('');
  }

  deleteIngredient(ingredient): void {
    const id = this.chosenIngredients.indexOf(ingredient);
    this.chosenIngredients = this.chosenIngredients.slice(0, id).concat(this.chosenIngredients.slice(id + 1));
  }

  setCurrentStep(): void {
    this.steps.push({
      photo: this.recipe.currentStepPhoto,
      description: this.currentStepControl.value,
    });
    delete this.recipe.currentStepPhoto;
    this.currentStepControl.setValue('');
    const input = (document.getElementById('currentFile') as HTMLInputElement);
    if (input.files) {
      input.files = null;
    }
  }

  deleteStep(step): void {
    const id = this.steps.indexOf(step);
    this.steps = this.steps.slice(0, id).concat(this.steps.slice(id + 1));
  }

  changeValue(event: Event, field: string): void {
    this.recipe[field] = (event.currentTarget as HTMLInputElement).value;
  }

  changeCheckboxValue(event: Event): void {
    this.recipe.isVegan = !(event.currentTarget as HTMLElement).classList.contains('mat-checkbox-checked')
  }

  setCurrentTypeName(type): void {
    this.recipe.type = type.type_name;
  }

  deleteType(): void {
    delete this.recipe.type;
  }

  sendRecipe(): void {
    this.recipe.steps = this.steps;
    this.recipe.ingredients = this.chosenIngredients;
    if (this.recipe.title && this.recipe.description && this.recipe.time && this.recipe.portions && this.recipe.type
      && this.recipe.ingredients.length > 0 && this.recipe.steps.length > 0 && this.recipe.preview) {
      this.recipesService
        .createRecipe(this.recipe)
        .subscribe();
      this.router.navigateByUrl('');
    } else {
      this.showErrorText = true;
    }
  }

  openIngredientDialog(): void {
    this.matDialog.open(IngredientDialogComponent);
  }
}
