import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthStore } from '../services/auth.store';

@Component({
  selector: 'register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {
  readonly nameControl = new FormControl();

  readonly emailControl = new FormControl();

  readonly passwordControl = new FormControl();

  constructor(
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private authService: AuthService,
    private authStore: AuthStore,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  register(): void {
    this.authService
      .register(this.nameControl.value.trim(), this.passwordControl.value.trim(), this.emailControl.value.trim())
      .subscribe(res => {
        if (res.token) {
          this.authStore.update({
            token: res.token,
            isLogged: true,
            isAdmin: res.isAdmin,
          });
          this.closeDialog();
        }
      });
  }
}
