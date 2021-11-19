import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthQuery } from '../services/auth.query';
import { AuthStore } from '../services/auth.store';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly isLogged$ = this.authQuery.isLogged$;

  constructor(
    private matDialog: MatDialog,
    private authQuery: AuthQuery,
    private authStore: AuthStore,
  ) {}

  openLoginModal(): void {
    this.matDialog.open(LoginDialogComponent);
  }

  logOut(): void {
    this.authStore.update({ isLogged: false })
  }
}
