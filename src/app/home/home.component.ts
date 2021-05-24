import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/models/profile.model';
import { AuthService } from 'src/services/auth.service';

interface Tab {
  label: string;
  route: string;
  disabled: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeTab: Tab = { label: '', route: '', disabled: true };
  profile: Profile = {
    firstname: 'Bruno',
    lastname: 'Alva',
    description:
      'Me gustaría no dejarte vacía - pequeña amiga "descripción" - pero al mismo tiempo no se me ocurre qué escribir...',
  };
  tabs: Tab[] = [{ label: 'Journal', route: '/journal', disabled: false }];

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    if (this.authService.authenticated) {
      this.tabs.push({ label: 'Admin Panel', route: '/admin-panel', disabled: false });
    }
    this.navigate(this.tabs[0]);
  }

  private navigate(tab: Tab) {
    this.activeTab = tab;
    this.router.navigateByUrl(tab.route);
  }

  onTabClick(tab: Tab) {
    this.navigate(tab);
  }
}
