import { CalendarMonthViewDay } from 'angular-calendar';
import * as moment from 'moment';
import { JournalEntry } from 'src/models/journal-entry.model';
import { FirestoreService } from 'src/services/firestore.service';
import { JournalService } from 'src/services/journal.service';
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  const today = moment(new Date());
  const mockEntry: JournalEntry = {
    name: 'test',
    url: 'test',
    date: moment().format(),
  };
  const defaultMockClickedDay = {
    inMonth: true,
    meta: mockEntry,
    badgeTotal: 1,
    isPast: false,
    isToday: true,
    isFuture: false,
  };

  const isWeekend = (date: moment.Moment) => {
    const day = date.format('dddd');
    return day === 'Sunday' || day === 'Saturday';
  };

  beforeEach(() => {
    const firestore = new FirestoreService();
    const journal = new JournalService(firestore);
    component = new CalendarComponent(journal);
  });

  it('should start "watching" today', () => {
    const initializationDate = component.selectedDate;
    expect(initializationDate).not.toBeNull();
    const isSameMonth = today.isSame(initializationDate, 'month');
    const isSameDay = today.isSame(initializationDate, 'day');
    const isSameYear = today.isSame(initializationDate, 'year');
    const isToday = isSameMonth && isSameDay && isSameYear;
    expect(isToday).toBeTrue();
  });

  it('should transform a fetched journal entry to a calendar event', () => {
    const event = component.toCalendarEvent(mockEntry);
    expect(event).not.toBeNull();
    expect(event.meta).not.toBeNull();
    const meta = event.meta as any;
    for (const key of Object.keys(meta)) {
      if (meta != null) {
        // if statement to avoid TS linting errors
        expect(meta[key]).toBe(mockEntry[key]);
      }
    }
    expect(event.allDay).toBeTrue();
    expect(event.draggable).toBeFalse();
    expect(event.resizable?.beforeStart).toBeFalse();
    expect(event.resizable?.afterEnd).toBeFalse();
    expect(event.start).toEqual(moment(mockEntry.date).toDate());
    expect(event.title).toBe(mockEntry.name);
  });

  it('should expand events accordion if events are available for clicked day and it was previously collapsed', () => {
    const mockClickedDay: CalendarMonthViewDay<JournalEntry> = {
      ...defaultMockClickedDay,
      events: [component.toCalendarEvent(mockEntry)],
      date: today.toDate(),
      day: today.day(),
      isWeekend: isWeekend(today),
    };
    const hasEvents = mockClickedDay.events.length > 0;
    expect(hasEvents).toBeTrue();
    expect(component.showEventsAccordion).toBeFalse();
    const e: { day: CalendarMonthViewDay<JournalEntry>; sourceEvent: MouseEvent | any } = {
      day: mockClickedDay,
      sourceEvent: null,
    };
    component.onDayClick(e);
    expect(component.showEventsAccordion).toBeTrue();
    expect(component.selectedDate).toEqual(e.day.date);
  });

  it('should NOT expand events accordion if clicked day has no events are available', () => {
    const yesterday = today.subtract(1, 'day');
    const mockClickedDay: CalendarMonthViewDay<JournalEntry> = {
      ...defaultMockClickedDay,
      events: [],
      date: yesterday.toDate(),
      day: yesterday.day(),
      isWeekend: isWeekend(yesterday),
      isFuture: false,
      isToday: false,
      isPast: true,
    };
    const hasEvents = mockClickedDay.events.length > 0;
    expect(hasEvents).toBeFalse();
    expect(component.showEventsAccordion).toBeFalse();
    const e: { day: CalendarMonthViewDay<JournalEntry>; sourceEvent: MouseEvent | any } = {
      day: mockClickedDay,
      sourceEvent: null,
    };
    component.onDayClick(e);
    expect(component.showEventsAccordion).toBeFalse();
    expect(component.selectedDate).toEqual(e.day.date);
  });

  it('should expand events accordion if clicked day has events', () => {
    const yesterday = today.subtract(1, 'day');
    const mockClickedDay: CalendarMonthViewDay<JournalEntry> = {
      ...defaultMockClickedDay,
      events: [component.toCalendarEvent(mockEntry)],
      date: yesterday.toDate(),
      day: yesterday.day(),
      isWeekend: isWeekend(yesterday),
      isFuture: false,
      isToday: false,
      isPast: true,
    };
    const hasEvents = mockClickedDay.events.length > 0;
    expect(hasEvents).toBeTrue();
    expect(component.showEventsAccordion).toBeFalse();
    const e: { day: CalendarMonthViewDay<JournalEntry>; sourceEvent: MouseEvent | any } = {
      day: mockClickedDay,
      sourceEvent: null,
    };
    component.onDayClick(e);
    expect(component.showEventsAccordion).toBeTrue();
    expect(component.selectedDate).toEqual(e.day.date);
  });
});
