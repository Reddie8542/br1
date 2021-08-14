import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { profile, Profile } from 'src/models/profile.model';
import { AuthService } from 'src/services/auth/auth.service';
import { StorageService } from 'src/services/storage.service';

interface Tab {
  label: string;
  route: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export const aboutMeTab: Tab = { label: 'About Me', route: 'about-me' };
export const journalTab: Tab = { label: 'Journal', route: 'journal' };
export const socialTab: Tab = { label: 'Social', route: 'social' };
export const adminTab: Tab = { label: 'Admin Panel', route: 'admin-panel' };
const defaultTabs: Tab[] = [aboutMeTab, journalTab, socialTab];

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  profile: Profile = profile;
  profilePicUrl$!: Observable<string>;
  tabs: Tab[] = [...defaultTabs];
  sub = new Subscription();

  constructor(public authService: AuthService, private router: Router, private storage: StorageService) {}

  ngOnInit() {
    this.sub = this.authService.authenticated$.subscribe(this.onAuthStateChanges.bind(this));
    this.profilePicUrl$ = this.storage.getImageURL(this.profile.profilePicName);
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
      this.router.navigate(['/admin-panel']);
    }
  }
}
