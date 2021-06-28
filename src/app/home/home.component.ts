import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Profile } from 'src/models/profile.model';
import { AuthService } from 'src/services/auth/auth.service';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';

interface Tab {
  label: string;
  route: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export const journalTab: Tab = { label: 'Journal', route: 'journal' };
export const socialTab: Tab = { label: 'Social', route: 'social' };
export const adminTab: Tab = { label: 'Admin Panel', route: 'admin-panel' };
const defaultTabs: Tab[] = [journalTab, socialTab];

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  profile: Profile = {
    firstname: 'Bruno',
    lastname: 'Alva',
    description:
      'Me gustaría no dejarte vacía - pequeña amiga "descripción" - pero al mismo tiempo no se me ocurre qué escribir...',
  };
  tabs: Tab[] = [...defaultTabs];
  sub = new Subscription();

  constructor(public authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.sub = this.authService.authenticated$.subscribe(this.onAuthStateChanges.bind(this));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTabDisabledMessage(tab: Tab): string {
    return tab.disabledMessage != null ? tab.disabledMessage : '';
  }

  onAuthStateChanges(authenticated: boolean) {
    this.tabs = [...defaultTabs];
    if (authenticated) {
      this.tabs.push(adminTab);
    }
  }

  onSignIn() {
    const config: MatDialogConfig = { width: '500px' };
    const dialogRef = this.dialog.open(SignInDialogComponent, config);
  }

  onSignOut() {
    this.authService.signOut();
  }
}
