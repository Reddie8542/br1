import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { JournalEntry } from 'src/models/journal-entry.model';
import { JournalService } from 'src/services/journal/journal.service';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEventCategory } from 'src/models/calendar-event-category.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  CategoriesDialogComponent,
  CategoriesDialogComponentData,
} from './categories-dialog/categories-dialog.component';

const colors: { [name: string]: { primary: string; secondary: string } } = {
  green: {
    primary: '#008f26',
    secondary: '#008f26',
  },
};

export const categories: CalendarEventCategory[] = [
  { id: null, name: 'journal-entry', color: '#008f26' },
  { id: null, name: 'writing', color: '#ebc23b' },
];

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendarView: CalendarView = CalendarView.Month;
  categories: CalendarEventCategory[] = [];
  events: CalendarEvent<JournalEntry>[] = [];
  loading = true;
  refreshCalendar = new Subject();
  selectedDate: Date = new Date();
  showEventsAccordion: boolean = false;
  sub = new Subscription();

  constructor(private journal: JournalService, private dialog: MatDialog) {}

  ngOnInit() {
    this.sub.add(
      combineLatest([this.journal.categories$, this.journal.entries$])
        .pipe(
          map(([categories, entries]) => {
            this.categories = [...categories];
            return entries.map((entry) => this.toCalendarEvent(entry));
          })
        )
        .subscribe((events) => {
          this.loading = false;
          this.events = [...events];
          this.refreshCalendar.next();
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private setEventsAccordion(
    clickedDay: CalendarMonthViewDay<JournalEntry>,
    selectedCalendarDate: moment.Moment
  ): void {
    const clickedDate = clickedDay.date;
    const clickedDateHasEvents = clickedDay.events.length > 0;
    const isSameMonth = selectedCalendarDate.isSame(clickedDate, 'month');
    const isSameAsSelectedDate = selectedCalendarDate.isSame(clickedDate, 'day') && isSameMonth;
    if (clickedDateHasEvents) {
      if (isSameAsSelectedDate) {
        this.showEventsAccordion = !this.showEventsAccordion;
      } else {
        this.showEventsAccordion = true;
      }
    } else {
      this.showEventsAccordion = false;
    }
  }

  onDayClick(e: { day: CalendarMonthViewDay<JournalEntry>; sourceEvent: MouseEvent | any }): void {
    this.setEventsAccordion(e.day, moment(this.selectedDate));
    this.selectedDate = e.day.date;
  }

  onEventClick(e: { event: CalendarEvent<JournalEntry>; sourceEvent: MouseEvent | any }): void {
    const entryUrl = e.event.meta?.url as string;
    window.open(entryUrl, '_blank');
  }

  onHelp() {
    const data: CategoriesDialogComponentData = { categories: this.categories };
    const config: MatDialogConfig<CategoriesDialogComponentData> = { data };
    this.dialog.open(CategoriesDialogComponent, config);
  }

  toCalendarEvent(entry: JournalEntry): CalendarEvent<JournalEntry> {
    const category = { ...this.categories.find((item) => item.id === entry.categoryId) } as CalendarEventCategory;
    const color = { primary: category.color, secondary: category.color };
    return {
      allDay: true,
      color,
      draggable: false,
      meta: entry,
      resizable: { beforeStart: false, afterEnd: false },
      start: moment(entry.date).toDate(),
      title: entry.name,
    } as CalendarEvent<JournalEntry>;
  }
}
