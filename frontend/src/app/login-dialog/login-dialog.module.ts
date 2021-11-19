import { NgModule } from '@angular/core';
import { LoginDialogComponent } from './login-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginDialogComponent],
  imports: [MatDialogModule, ReactiveFormsModule],
  exports: [LoginDialogComponent],
})
export class LoginDialogModule {}
