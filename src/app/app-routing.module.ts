import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './home/admin-panel/admin-panel.component';
import { HomeComponent } from './home/home.component';
import { JournalComponent } from './home/journal/journal.component';
import { SocialComponent } from './home/social/social.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'admin-panel', pathMatch: 'full' },
      { path: 'journal', component: JournalComponent },
      { path: 'admin-panel', component: AdminPanelComponent /*canActivate: [AuthGuard]*/ },
      { path: 'social', component: SocialComponent },
    ],
  },
  { path: '*', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
