import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  tabs: Tab[] = [
    { label: 'Journal', route: '/journal', disabled: false },
    { label: 'In progress...', route: '/', disabled: true },
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
