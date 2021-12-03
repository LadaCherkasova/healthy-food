import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthStore } from '../services/auth.store';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  readonly emailControl = new FormControl();

  readonly passwordControl = new FormControl();

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService,
    private authStore: AuthStore,
    private matDialog: MatDialog,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  openRegisterModal(): void {
    this.matDialog.open(RegisterDialogComponent);
    this.dialogRef.close();
  }

  login(): void {
    this.authService
      .login(this.passwordControl.value.trim(), this.emailControl.value.trim())
      .subscribe(res => {
        if (res.token) {
          this.authStore.update({
            token: res.token,
            isLogged: true,
            isAdmin: res.isAdmin,
            userId: res.userId,
          });
          this.closeDialog();
        }
      });
  }
}
