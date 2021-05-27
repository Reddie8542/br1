import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { JournalEntry } from 'src/models/journal-entry.model';

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
  entries: JournalEntry[] = [
    {
      id: 1,
      name: 'Día 01',
      date: new Date(2021, 1, 6),
      url: 'https://www.evernote.com/shard/s724/sh/955c3c5e-93f3-bfc1-395a-04eed97aaf4e/ddb0bac7ac4f180ef95e4f132af81132',
    },
  ];
  events: CalendarEvent<JournalEntry>[] = [];
  isTodayOpen: boolean = false;
  openedDate: Date = new Date();
  view: CalendarView = CalendarView.Month;

  constructor() {}

  ngOnInit() {
    this.events = this.entries.map((entry) => {
      const date = typeof entry.date === 'string' ? new Date(entry.date) : entry.date;
      return {
        allDay: true,
        color: colors.green,
        draggable: false,
        meta: entry,
        resizable: { beforeStart: false, afterEnd: false },
        start: date,
        title: entry.name,
      };
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
