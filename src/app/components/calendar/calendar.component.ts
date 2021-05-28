import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { JournalEntry } from 'src/models/journal-entry.model';
import { JournalService } from 'src/services/journal.service';

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
  openedDate: Date = new Date();
  view: CalendarView = CalendarView.Month;

  constructor(private journal: JournalService) {}

  ngOnInit() {
    this.journal
      .getAllEntries()
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const entry = doc.data() as JournalEntry;
          const event: CalendarEvent<JournalEntry> = {
            allDay: true,
            color: colors.green,
            draggable: false,
            meta: entry,
            resizable: { beforeStart: false, afterEnd: false },
            start: new Date(entry.date),
            title: entry.name,
          };
          this.events.push(event);
        });
      });
  }

  onDayClick(e: { day: CalendarMonthViewDay<JournalEntry>; sourceEvent: MouseEvent | any }): void {
    this.setEventsAccordion(e.day);
    this.openedDate = e.day.date;
  }

  onEventClick(e: { event: CalendarEvent<JournalEntry>; sourceEvent: MouseEvent | any }): void {
    const entryUrl = e.event.meta?.url;
    window.open(entryUrl, '_blank');
  }

  private setEventsAccordion(clickedDay: CalendarMonthViewDay) {
    const clickedDate = clickedDay.date;
    const clickedDateEvents = clickedDay.events;
    const openedDate = moment(this.openedDate);
    const isSameMonth = openedDate.isSame(clickedDate, 'month');
    if (isSameMonth) {
      const isSameDay = openedDate.isSame(clickedDate, 'day');
      if ((isSameDay && this.isTodayOpen === true) || clickedDateEvents.length === 0) {
        this.isTodayOpen = false;
      } else {
        this.isTodayOpen = true;
      }
    }
  }
}
