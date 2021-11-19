import { NgModule } from '@angular/core';
import { RegisterDialogComponent } from './register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterDialogComponent],
  imports: [MatDialogModule, ReactiveFormsModule],
  exports: [RegisterDialogComponent],
})
export class RegisterDialogModule { }
