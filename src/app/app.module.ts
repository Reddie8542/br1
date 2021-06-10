import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
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
import { JournalEntryFormComponent } from './home/admin-panel/journal-entry-form/journal-entry-form.component';
import { JournalEntryTableComponent } from './home/admin-panel/journal-entry-table/journal-entry-table.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [
    AdminPanelComponent,
    AppComponent,
    CalendarComponent,
    HomeComponent,
    JournalComponent,
    JournalEntryFormComponent,
    JournalEntryTableComponent,
    SafePipe,
    SignInDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
