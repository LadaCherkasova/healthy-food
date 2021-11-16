import { Component } from '@angular/core';

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

  readonly ingredients = ['Ингредиент', 'Ингредиент', 'Ингредиент', 'Ингредиент', 'Ингредиент', 'Ингредиент',
    'Ингредиент', 'Ингредиент', 'Ингредиент', 'Ингредиент', 'Ингредиент'];

  readonly types = ['Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип'];

  showFindIcon = false;

  toggleInputIcon(): void {
    this.showFindIcon = !this.showFindIcon;
  }
}
