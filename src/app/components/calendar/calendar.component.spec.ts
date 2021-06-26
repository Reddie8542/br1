import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarMonthViewDay } from 'angular-calendar';
import { CalendarDatePipe } from 'angular-calendar/modules/common/calendar-date.pipe';
import * as moment from 'moment';
import { JournalEntry } from 'src/models/journal-entry.model';
import { FirestoreService } from 'src/services/firestore.service';
import { JournalService } from 'src/services/journal/journal.service';
import { buildMockCollection } from 'src/utils/test-utils';
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let dialog: MatDialog;
  let firestore: FirestoreService;
  let journal: JournalService;
  const today = moment(new Date());
  const mockEntry: JournalEntry = {
    id: null,
    categoryId: null,
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
  const mockCollection = buildMockCollection([{}]);

  const isWeekend = (date: moment.Moment) => {
    const day = date.format('dddd');
    return day === 'Sunday' || day === 'Saturday';
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FirestoreService, JournalService],
    });
    firestore = TestBed.inject(FirestoreService);
    spyOn(firestore, 'getCollection').and.returnValue(mockCollection);
    journal = TestBed.inject(JournalService);
    dialog = { open: () => {} } as any;
    component = new CalendarComponent(journal, dialog);
    spyOn(dialog, 'open');
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
    expect(event.title).toBe(mockEntry.name as string);
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

  it('should open a dialog when clicking on help', () => {
    const none = 0;
    expect(dialog.open).toHaveBeenCalledTimes(none);
    component.onHelp();
    expect(dialog.open).toHaveBeenCalledTimes(1);
  });
});
