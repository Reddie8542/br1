import { Component } from '@angular/core';

interface Network {
  name: string;
  url: string | null | undefined;
  icon: string;
  tooltip: string;
}

@Component({
  selector: 'app-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.scss'],
})
export class SocialComponent {
  networks: Network[] = [
    { name: 'GitHub', url: 'https://github.com/Reddie8542', icon: 'code', tooltip: '' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/br1-alva/',
      icon: 'business_center',
      tooltip: '',
    },
    { name: 'Facebook', url: 'https://www.facebook.com/bruno.alva.3/', icon: 'facebook', tooltip: '' },
    { name: 'Twitter', url: 'https://twitter.com/Reddie8542', icon: 'flutter_dash', tooltip: '' },
    { name: 'Instagram', url: 'https://www.instagram.com/br1alva/', icon: 'camera', tooltip: '' },
    {
      name: 'Discord',
      url: 'https://discord.com/',
      icon: 'videogame_asset',
      tooltip: 'Reddie#8542',
    },
  ];
}
