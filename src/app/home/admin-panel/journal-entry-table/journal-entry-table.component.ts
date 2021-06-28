import { DataSource } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import {
  ConfirmDialogComponent,
  ConfirmDialogComponentData,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { JournalEntry } from 'src/models/journal-entry.model';
import { JournalService } from 'src/services/journal/journal.service';
import {
  JournalEntryFormDialogComponent,
  JournalEntryFormDialogComponentData,
} from '../journal-entry-form/journal-entry-form-dialog.component';

class JournalEntryTableDataSource extends DataSource<JournalEntry> {
  private _entries = new ReplaySubject<JournalEntry[]>();

  constructor(initialData: JournalEntry[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<JournalEntry[]> {
    return this._entries;
  }

  disconnect() {}

  setData(data: JournalEntry[]) {
    this._entries.next(data);
  }
}

const deleteDialogData: MatDialogConfig<ConfirmDialogComponentData> = {
  data: {
    title: 'Delete item',
    message: 'Are you sure you want to delete this item?',
    confirmButtonLabel: 'Yes, delete it',
    cancelButtonLabel: 'Cancel',
  },
};

@Component({
  selector: 'app-journal-entry-table',
  templateUrl: 'journal-entry-table.component.html',
  styleUrls: ['journal-entry-table.component.scss'],
})
export class JournalEntryTableComponent implements OnInit, OnDestroy {
  columns = ['name', 'date', 'url', 'actions'];
  tableData = new JournalEntryTableDataSource([]);
  sub = new Subscription();

  constructor(private dialog: MatDialog, private journal: JournalService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.sub = this.journal.entries$.subscribe((entries) => this.tableData.setData(entries));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.tableData.disconnect();
  }

  onCreateEntry(): void {
    this.dialog.open(JournalEntryFormDialogComponent);
  }

  onDeleteEntry(entry: JournalEntry) {
    this.dialog
      .open<ConfirmDialogComponent, ConfirmDialogComponentData, boolean>(ConfirmDialogComponent, deleteDialogData)
      .afterClosed()
      .pipe(
        take(1),
        filter((confirmed) => confirmed != null && confirmed)
      )
      .subscribe((confirmed) =>
        this.journal
          .deleteEntry(entry)
          .then(() => this.snackbar.open('Journal entry deleted successfully', 'Dismiss', { duration: 3 * 1000 }))
      );
  }

  onEditEntry(entry: JournalEntry) {
    const config: MatDialogConfig<JournalEntryFormDialogComponentData> = { data: { initValue: entry } };
    this.dialog.open<JournalEntryFormDialogComponent, JournalEntryFormDialogComponentData>(
      JournalEntryFormDialogComponent,
      config
    );
  }
}
