import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/models/profile.model';

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
  tabs: Tab[] = [
    { label: 'Journal', route: '/journal', disabled: false },
    // { label: 'In progress...', route: '/', disabled: true },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.navigate(this.tabs[0]);
  }

  private navigate(tab: Tab) {
    this.activeTab = tab;
    this.router.navigateByUrl(tab.route);
  }
}
