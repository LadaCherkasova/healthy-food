import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HeaderModule } from './header/header.module';
import { FindPageModule } from './find-page/find-page.module';
import { RecipePreviewModule } from './recipe-preview/recipe-preview.module';
import { FavouritePageModule } from './favourite-page/favourite-page.module';
import { RecipePageModule } from './recipe-page/recipe-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HeaderModule,
    FindPageModule,
    RecipePreviewModule,
    FavouritePageModule,
    RecipePageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
