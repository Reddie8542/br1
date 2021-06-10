import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { JournalEntry } from 'src/models/journal-entry.model';
import { JournalService } from 'src/services/journal/journal.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

const colors: { [name: string]: { primary: string; secondary: string } } = {
  green: {
    primary: '#008f26',
    secondary: '#008f26',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendarView: CalendarView = CalendarView.Month;
  events!: CalendarEvent<JournalEntry>[];
  refreshCalendar = new Subject();
  selectedDate: Date = new Date();
  showEventsAccordion: boolean = false;
  sub = new Subscription();

  constructor(private journal: JournalService) {}

  ngOnInit() {
    const events$ = this.journal.entries$.pipe(map((entries) => entries.map((entry) => this.toCalendarEvent(entry))));
    this.sub = events$.subscribe((events) => (this.events = events));
    if (this.journal.isEmpty()) {
      this.journal.getAllEntries();
    }
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
    const entryUrl = e.event.meta?.url;
    window.open(entryUrl, '_blank');
  }

  toCalendarEvent(entry: JournalEntry): CalendarEvent<JournalEntry> {
    return {
      allDay: true,
      color: colors.green,
      draggable: false,
      meta: entry,
      resizable: { beforeStart: false, afterEnd: false },
      start: moment(entry.date).toDate(),
      title: entry.name,
    } as CalendarEvent<JournalEntry>;
  }
}
