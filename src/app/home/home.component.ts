import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from 'src/models/profile.model';
import { AuthService } from 'src/services/auth.service';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';

interface Tab {
  label: string;
  route: string;
  disabled: boolean;
}

const journalTab: Tab = { label: 'Journal', route: '/journal', disabled: false };
const adminTab: Tab = { label: 'Admin Panel', route: '/admin-panel', disabled: false };

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  activeTab!: Tab;
  profile: Profile = {
    firstname: 'Bruno',
    lastname: 'Alva',
    description:
      'Me gustaría no dejarte vacía - pequeña amiga "descripción" - pero al mismo tiempo no se me ocurre qué escribir...',
  };
  tabs: Tab[] = [];
  sub = new Subscription();

  constructor(public authService: AuthService, private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.sub = this.authService.authenticated$.subscribe(this.onAuthStateChanges.bind(this));
    this.onAuthStateChanges(this.authService.authenticated$.value);
    this.tabs = [journalTab];
    this.navigate(this.tabs[0]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private navigate(tab: Tab) {
    this.activeTab = tab;
    this.router.navigateByUrl(tab.route);
  }

  onAuthStateChanges(authenticated: boolean) {
    if (authenticated) {
      this.tabs.push(adminTab);
    } else {
      const index = this.tabs.findIndex((tab) => tab.route === adminTab.route);
      this.tabs.splice(index, 1);
    }
  }

  onSignIn() {
    const config: MatDialogConfig = { width: '500px' };
    const dialogRef = this.dialog.open(SignInDialogComponent, config);
  }

  onSignOut() {
    this.authService.signOut();
  }

  onTabClick(tab: Tab) {
    this.navigate(tab);
  }
}
