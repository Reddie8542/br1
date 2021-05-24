import { OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-journal',
  templateUrl: 'journal.component.html',
  styleUrls: ['journal.component.scss'],
})
export class JournalComponent {}
