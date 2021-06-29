import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
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

const deleteDialogData: MatDialogConfig<ConfirmDialogComponentData> = {
  data: {
    title: 'Delete item',
    message: 'Are you sure you want to delete this item?',
    confirmButtonLabel: 'Yes, delete it',
    cancelButtonLabel: 'Cancel',
  },
};

class JournalEntryTableDataSource extends MatTableDataSource<JournalEntry> {
  private _entries = new BehaviorSubject<JournalEntry[]>([]);

  constructor(initialData: JournalEntry[]) {
    super();
    this.setData(initialData);
  }

  connect(): BehaviorSubject<JournalEntry[]> {
    return this._entries;
  }

  disconnect() {
    this._entries.complete();
  }

  setData(data: JournalEntry[]) {
    this._entries.next(data);
  }

  setPage(data: JournalEntry[], event: PageEvent) {
    const clone = [...data];
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = (event.pageIndex + 1) * event.pageSize;
    const content = clone.slice(startIndex, endIndex);
    this.setData(content);
  }
}

@Component({
  selector: 'app-journal-entry-table',
  templateUrl: 'journal-entry-table.component.html',
  styleUrls: ['journal-entry-table.component.scss'],
})
export class JournalEntryTableComponent implements OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columns = ['name', 'date', 'url', 'actions'];
  defaultPageSize = 5;
  entries: JournalEntry[] = [];
  pageSizeOptions = [this.defaultPageSize, 10, 20];
  tableData = new JournalEntryTableDataSource([]);
  sub = new Subscription();

  constructor(private dialog: MatDialog, private journal: JournalService, private snackbar: MatSnackBar) {}

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.sub.add(
      this.journal.entries$.subscribe((entries) => {
        this.entries = entries;
        const firstPage = { pageSize: this.defaultPageSize, pageIndex: 0 } as PageEvent;
        this.tableData.setPage(entries, firstPage);
      })
    );
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
