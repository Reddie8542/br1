import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './home/admin-panel/admin-panel.component';
import { HomeComponent } from './home/home.component';
import { JournalComponent } from './home/journal/journal.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'journal', component: JournalComponent },
      { path: 'admin-panel', component: AdminPanelComponent },
    ],
  },
  { path: '*', redirectTo: 'journal' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
