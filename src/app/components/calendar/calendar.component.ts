import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { JournalEntry } from 'src/models/journal-entry.model';
import { JournalService } from 'src/services/journal.service';
import firebase from 'firebase';
import { Subject } from 'rxjs';

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
export class CalendarComponent implements OnInit {
  events: CalendarEvent<JournalEntry>[] = [];
  isTodayOpen: boolean = false;
  calendarDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  refreshCalendar = new Subject();

  constructor(private journal: JournalService) {}

  ngOnInit() {
    this.journal
      .getAllEntries()
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const event = this.transformDocumentDataToCalendarEvent(doc);
          this.events.push(event);
        });
        this.refreshCalendar.next();
      });
  }

  private setEventsAccordion(clickedDay: CalendarMonthViewDay, calendarDate: moment.Moment) {
    const clickedDate = clickedDay.date;
    const clickedDateHasEvents = clickedDay.events.length === 0;
    const isSameMonth = calendarDate.isSame(clickedDate, 'month');
    if (isSameMonth) {
      const isSameDay = calendarDate.isSame(clickedDate, 'day');
      if (!clickedDateHasEvents || (isSameDay && this.isTodayOpen)) {
        this.isTodayOpen = false;
      } else {
        this.isTodayOpen = true;
      }
    }
  }

  private transformDocumentDataToCalendarEvent(doc: firebase.firestore.DocumentData): CalendarEvent<JournalEntry> {
    const entry = doc.data() as JournalEntry;
    return {
      allDay: true,
      color: colors.green,
      draggable: false,
      meta: entry,
      resizable: { beforeStart: false, afterEnd: false },
      start: new Date(entry.date),
      title: entry.name,
    } as CalendarEvent<JournalEntry>;
  }

  onDayClick(e: { day: CalendarMonthViewDay<JournalEntry>; sourceEvent: MouseEvent | any }): void {
    this.setEventsAccordion(e.day, moment(this.calendarDate));
    this.calendarDate = e.day.date;
  }

  onEventClick(e: { event: CalendarEvent<JournalEntry>; sourceEvent: MouseEvent | any }): void {
    const entryUrl = e.event.meta?.url;
    window.open(entryUrl, '_blank');
  }
}
