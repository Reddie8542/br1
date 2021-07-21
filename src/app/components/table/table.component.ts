import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({ template: '' })
export class TableComponent<R> implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _records$!: Observable<R[]>;

  columns: string[] = [];
  page: PageEvent = { pageSize: 5, pageIndex: 0 } as PageEvent;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];
  sub = new Subscription();
  tableData = new TableDataSource<R>([]);
  records: R[] = [];

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.sub.add(
      this._records$.subscribe((records) => {
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
    const snapshot = [...this.records];
    this.tableData.setPage(snapshot, page);
  }

  setRecordsObservable(observable: Observable<R[]>) {
    this._records$ = observable;
  }
}

export class TableDataSource<R> extends MatTableDataSource<R> {
  private _records = new BehaviorSubject<R[]>([]);

  constructor(initialRecords: R[]) {
    super();
    this.setData(initialRecords);
  }

  private setData(records: R[]) {
    this._records.next(records);
  }

  connect(): BehaviorSubject<R[]> {
    return this._records;
  }

  disconnect() {
    this._records.complete();
  }

  setPage(recordsSnapshot: R[], page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = (page.pageIndex + 1) * page.pageSize;
    const content = recordsSnapshot.slice(startIndex, endIndex);
    this.setData(content);
  }
}
