import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SignInDialogComponent } from 'src/app/home/sign-in-dialog/sign-in-dialog.component';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authenticated$!: Observable<boolean>;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.authenticated$ = this.authService.authenticated$;
  }

  onSignIn() {
    const config: MatDialogConfig = { width: '500px' };
    const dialogRef = this.dialog.open(SignInDialogComponent, config);
  }

  onSignOut() {
    this.authService.signOut();
  }
}
