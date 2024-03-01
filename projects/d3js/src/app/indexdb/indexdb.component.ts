import { Component, OnInit } from '@angular/core';
import { IndexdbService } from './indexdb.service';

@Component({
  selector: 'app-indexdb',
  templateUrl: './indexdb.component.html',
  styleUrls: ['./indexdb.component.css']
})
export class IndexdbComponent implements OnInit {

  constructor(private _indexDB: IndexdbService) { }

  ngOnInit() {
    this._indexDB.init();

    this._indexDB.dbObj.subscribe((db) => {
      this._indexDB.addItem('hello');
    });
  }

}
