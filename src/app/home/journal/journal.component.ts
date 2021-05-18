import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-journal',
  templateUrl: 'journal.component.html',
  styleUrls: ['journal.component.scss'],
})
export class JournalComponent implements OnInit {
  showCalendar = true;
  entryUrl =
    'https://www.evernote.com/shard/s724/sh/955c3c5e-93f3-bfc1-395a-04eed97aaf4e/ddb0bac7ac4f180ef95e4f132af81132';

  ngOnInit() {}
}
