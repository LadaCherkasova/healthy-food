import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss']
})
export class FindPageComponent {
  readonly recipeInfo = {
    image: 'mock',
    title: 'Название блюда',
    description: 'Краткое описание блюда Краткое описание блюда Краткое описание блюда Краткое описание блюда',
    isFavourite: false,
    type: 'Десерт',
    time: 10,
  }

  readonly timeControl = new FormControl();

  readonly veganControl = new FormControl();

  readonly ingredientSearchControl = new FormControl();

  ingredients: any = [];

  currentIngredients: any = [];

  types: any = [];

  showFindIcon = false;

  shields: any = {
    ingredients: [],
    type: undefined,
    time: undefined,
    isVegan: undefined,
  };

  constructor(private settingsService: SettingsService) {
    this.settingsService
      .getAvailableIngredients()
      .subscribe((response) => {
        this.ingredients = response;
        this.currentIngredients = response;
      });

    this.settingsService
      .getDishesTypes()
      .subscribe(response => this.types = response);

    this.timeControl.valueChanges.pipe(
      tap(time => this.shields.time = time !== '' ? time : undefined)
    ).subscribe();

    this.veganControl.valueChanges.pipe(
      tap(isVegan => this.shields.isVegan = isVegan ? true : undefined)
    ).subscribe();

    this.ingredientSearchControl.valueChanges.pipe(
      tap((value) => {
        this.currentIngredients = this.ingredients.filter(
          ingredient => ingredient.ingredient_name.toLowerCase().includes(value.toLowerCase())
        )
      })
    ).subscribe();
  };

  toggleInputIcon(): void {
    this.showFindIcon = !this.showFindIcon;
  }

  toggleIngredient(ingredient: string): void {
    const id2 = this.findIdOfIngredient(ingredient);
    const id = this.findIdOfShield(ingredient);
    if (id !== -1) {
      delete this.ingredients[id2].checked;
      this.shields.ingredients = this.shields.ingredients.slice(0, id).concat(this.shields.ingredients.slice(id + 1));
    } else {
      this.ingredients[id2].checked = true;
      this.shields.ingredients.push({
        title: ingredient
      });
    }
  }

  toggleType(type: string): void {
    if (this.shields.type) {
      this.shields.type = undefined
    } else {
      this.shields.type = type;
    }
  }

  deleteWhiteShield(isTime: boolean): void {
    isTime
      ? this.timeControl.setValue('')
      : this.veganControl.setValue(false);
  }

  deleteBlueShield(ingredient: string): void {
    const id = this.findIdOfShield(ingredient);
    this.shields.ingredients = this.shields.ingredients.slice(0, id).concat(this.shields.ingredients.slice(id + 1));
    const id2 = this.findIdOfIngredient(ingredient);
    delete this.ingredients[id2].checked;
  }

  deleteRedShield(): void {
    this.shields.type = undefined;
  }

  consoleFinal(): void {
    this.toggleInputIcon();
    console.log(this.shields);
  }

  private findIdOfShield(value: string): number {
    const foundShield = this.shields.ingredients.find(
      shield => shield.title === value
    );
    return this.shields.ingredients.indexOf(foundShield);
  }

  private findIdOfIngredient(value: string): number {
    const foundIngredient = this.ingredients.find(
      item => item.ingredient_name === value
    );
    return this.ingredients.indexOf(foundIngredient);
  }
}
