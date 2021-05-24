import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import * as moment from 'moment';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
})
export class CalendarComponent {
  events: CalendarEvent[] = [
    {
      start: moment().subtract(1, 'days').toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'A 3 day event',
      color: colors.red,
      // actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: moment().toDate(),
      title: 'An event with no end date',
      color: colors.yellow,
      // actions: this.actions,
    },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];
  isTodayOpen: boolean = true;
  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  view: CalendarView = CalendarView.Month;
  openedDate: Date = new Date();
  refresh: Subject<any> = new Subject();

  constructor() {}

  addEvent(): void {
    // this.events = [
    //   ...this.events,
    //   {
    //     title: 'New event',
    //     start: startOfDay(new Date()),
    //     end: endOfDay(new Date()),
    //     color: colors.red,
    //     draggable: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    // ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    // this.onEventClick('Dropped or resized', event);
  }

  onDayClick(event: { day: CalendarMonthViewDay; sourceEvent: MouseEvent | any }): void {
    this.setEventsAccordion(event.day);
    this.openedDate = event.day.date;
  }

  onEventClick(event: { event: CalendarEvent; sourceEvent: MouseEvent | any }): void {
    console.log('event clicked!', event);
  }

  onViewDateChange() {
    this.isTodayOpen = false;
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
