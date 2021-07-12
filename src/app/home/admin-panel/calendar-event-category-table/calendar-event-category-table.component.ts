import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, take } from 'rxjs/operators';
import {
  ConfirmDialogComponent,
  ConfirmDialogComponentData,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { CalendarEventCategory } from 'src/models/calendar-event-category.model';
import { JournalService } from 'src/services/journal/journal.service';
import {
  CalendarEventCategoryFormDialogComponent,
  CalendarEventCategoryFormDialogComponentData,
} from '../calendar-event-category-form-dialog/calendar-event-category-form-dialog.component';

const deleteDialogData: MatDialogConfig<ConfirmDialogComponentData> = {
  data: {
    title: 'Delete item',
    message: 'Are you sure you want to delete this item?',
    confirmButtonLabel: 'Yes, delete it',
    cancelButtonLabel: 'Cancel',
  },
};

@Component({
  selector: 'app-calendar-event-category-table',
  templateUrl: 'calendar-event-category-table.component.html',
  styleUrls: ['calendar-event-category-table.component.scss'],
})
export class CalendarEventCategoryTableComponent
  extends TableComponent<CalendarEventCategory>
  implements OnInit, OnDestroy, AfterViewInit
{
  constructor(private dialog: MatDialog, private journal: JournalService, private snackbar: MatSnackBar) {
    super();
  }

  ngOnInit() {
    this.columns = ['name', 'color', 'actions'];
    this.setRecordsObservable(this.journal.categories$);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onCreateCategory() {
    this.dialog.open(CalendarEventCategoryFormDialogComponent);
  }

  onEditCategory(category: CalendarEventCategory) {
    const config: MatDialogConfig<CalendarEventCategoryFormDialogComponentData> = { data: { initValue: category } };
    this.dialog.open(CalendarEventCategoryFormDialogComponent, config);
  }

  onDeleteCategory(category: CalendarEventCategory) {
    this.dialog
      .open<ConfirmDialogComponent, ConfirmDialogComponentData, boolean>(ConfirmDialogComponent, deleteDialogData)
      .afterClosed()
      .pipe(
        take(1),
        filter((confirmed) => confirmed != null && confirmed)
      )
      .subscribe((confirmed) =>
        this.journal
          .deleteCategory(category)
          .then(() => this.snackbar.open('Category deleted successfully', 'Dismiss', { duration: 3 * 1000 }))
      );
  }
}
