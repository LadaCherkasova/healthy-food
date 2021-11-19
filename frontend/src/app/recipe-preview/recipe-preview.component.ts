import { Component, Input } from '@angular/core';

@Component({
  selector: 'recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss']
})
export class RecipePreviewComponent {
  @Input()
  image: string;

  @Input()
  time: number;

  @Input()
  title: string;

  @Input()
  type: string;

  @Input()
  description: string;

  @Input()
  isFavourite: boolean;

  @Input()
  isVegan: boolean;
}