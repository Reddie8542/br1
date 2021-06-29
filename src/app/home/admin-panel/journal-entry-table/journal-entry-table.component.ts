import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { TableComponent, TableDataSource } from 'src/app/components/table/table.component';
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

@Component({
  selector: 'app-journal-entry-table',
  templateUrl: 'journal-entry-table.component.html',
  styleUrls: ['journal-entry-table.component.scss'],
})
export class JournalEntryTableComponent
  extends TableComponent<JournalEntry>
  implements OnInit, OnDestroy, AfterViewInit
{
  constructor(private dialog: MatDialog, private journal: JournalService, private snackbar: MatSnackBar) {
    super();
  }

  ngOnInit() {
    this.columns = ['name', 'date', 'actions'];
    this.records$ = this.journal.entries$;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
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
