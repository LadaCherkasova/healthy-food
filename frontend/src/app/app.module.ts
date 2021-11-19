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
import { RegisterDialogModule } from './register-dialog/register-dialog.module';
import { LoginDialogModule } from './login-dialog/login-dialog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './services/settings.service';

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
    LoginDialogModule,
    RegisterDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [AuthService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule {}