import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeComponent } from './home/home.component';
import { JournalComponent } from './home/journal/journal.component';
import { SafePipe } from 'src/pipes/safe.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AdminPanelComponent } from './home/admin-panel/admin-panel.component';
import { SignInDialogComponent } from './home/sign-in-dialog/sign-in-dialog.component';
import { JournalEntryFormDialogComponent } from './home/admin-panel/journal-entry-form/journal-entry-form-dialog.component';
import { JournalEntryTableComponent } from './home/admin-panel/journal-entry-table/journal-entry-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DisplayNamePipe } from 'src/pipes/display-name/display-name.pipe';
import { SocialComponent } from './home/social/social.component';
import { CategoriesDialogComponent } from './components/calendar/categories-dialog/categories-dialog.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

const components = [
  AdminPanelComponent,
  AppComponent,
  CalendarComponent,
  CategoriesDialogComponent,
  ConfirmDialogComponent,
  HomeComponent,
  JournalComponent,
  JournalEntryFormDialogComponent,
  JournalEntryTableComponent,
  SignInDialogComponent,
  SocialComponent,
];

const pipes = [DisplayNamePipe, SafePipe];

const angularModules = [
  AppRoutingModule,
  BrowserModule,
  BrowserAnimationsModule,
  CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ReactiveFormsModule,
  CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
];

const materialModules = [
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMomentDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTabsModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [...angularModules, ...materialModules],
  bootstrap: [AppComponent],
})
export class AppModule {}
