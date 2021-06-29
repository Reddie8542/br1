import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableComponent } from 'src/app/components/table/table.component';
import { CalendarEventCategory } from 'src/models/calendar-event-category.model';
import { JournalService } from 'src/services/journal/journal.service';

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
    this.records$ = this.journal.categories$;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onCreateCategory() {
    console.log('On create!');
  }

  onEditCategory(category: CalendarEventCategory) {
    console.log('On edit!');
  }

  onDeleteCategory(category: CalendarEventCategory) {
    console.log('On delete!');
  }
}
