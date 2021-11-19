import { Component } from '@angular/core';

@Component({
  selector: 'favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.scss']
})
export class FavouritePageComponent {
  readonly recipeInfo = {
    image: 'mock',
    title: 'Название блюда',
    description: 'Краткое описание блюда Краткое описание блюда Краткое описание блюда Краткое описание блюда',
    isFavourite: true,
    type: 'Десерт',
    time: 10,
  }
}
