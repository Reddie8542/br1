import { CalendarEventCategory } from './calendar-event-category.model';

export interface JournalEntry {
  [key: string]: string | CalendarEventCategory | null | undefined;
  id: string | null | undefined;
  name: string | null | undefined;
  date: string | null | undefined;
  url: string | null | undefined;
  category: CalendarEventCategory | null | undefined;
}
