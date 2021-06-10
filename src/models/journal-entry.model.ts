export interface JournalEntry {
  [key: string]: string | undefined;
  id?: string;
  name: string;
  date: string;
  url: string;
}
