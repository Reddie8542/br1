import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEventCategory } from 'src/models/calendar-event-category.model';

export interface CategoriesDialogComponentData {
  categories: CalendarEventCategory[];
}

@Component({
  templateUrl: 'categories-dialog.component.html',
  styleUrls: ['categories-dialog.component.scss'],
})
export class CategoriesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CategoriesDialogComponentData) {}
}
