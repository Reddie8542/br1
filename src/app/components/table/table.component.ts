import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  template: '',
})
export class TableComponent<R> implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columns: string[] = [];
  records: R[] = [];
  records$!: Observable<R[]>;
  defaultPageSize = 5;
  page: PageEvent = { pageSize: 5, pageIndex: 0 } as PageEvent;
  pageSizeOptions = [this.defaultPageSize, 10, 20];
  tableData = new TableDataSource<R>([]);
  sub = new Subscription();

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.sub.add(
      this.records$.subscribe((records) => {
        this.records = records;
        this.tableData.setPage(records, this.page);
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.tableData.disconnect();
  }

  onPageChange(page: PageEvent) {
    this.page = page;
    this.tableData.setPage(this.records, page);
  }
}

export class TableDataSource<R> extends MatTableDataSource<R> {
  private _records = new BehaviorSubject<R[]>([]);

  constructor(initialRecords: R[]) {
    super();
    this.setData(initialRecords);
  }

  connect(): BehaviorSubject<R[]> {
    return this._records;
  }

  disconnect() {
    this._records.complete();
  }

  setData(records: R[]) {
    this._records.next(records);
  }

  setPage(records: R[], page: PageEvent) {
    const clone = [...records];
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = (page.pageIndex + 1) * page.pageSize;
    const content = clone.slice(startIndex, endIndex);
    this.setData(content);
  }
}
