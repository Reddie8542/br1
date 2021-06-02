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
  showEventsAccordion: boolean = false;
  selectedDate: Date = new Date();
  calendarView: CalendarView = CalendarView.Month;
  refreshCalendar = new Subject();

  constructor(private journal: JournalService) {}

  ngOnInit() {
    this.journal
      .getAllEntries()
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => this.events.push(this.toCalendarEvent(doc.data() as JournalEntry)));
        this.refreshCalendar.next();
      });
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
