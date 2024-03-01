import { Component, OnInit } from '@angular/core';
import { IndexdbService } from './indexdb.service';

@Component({
  selector: 'app-indexdb',
  templateUrl: './indexdb.component.html',
  styleUrls: ['./indexdb.component.css']
})
export class IndexdbComponent implements OnInit {

  showData = 'hello';

  constructor(private _indexDB: IndexdbService) { }

  ngOnInit() {
    this._indexDB.init();

    this._indexDB.dbObj.subscribe((db) => {
      this._indexDB.addItem('hello', 'name');
    });
  }

  getData() {
    this._indexDB.getItem('name').then((data: any) => this.showData = data).catch(e => console.log(e));
  }

  updateData(event: HTMLInputElement) {
    this._indexDB.updateItem(event.value, 'name');
  }

  deleteData() {
    this._indexDB.deleteItem('age');
  }

  addData(event: HTMLInputElement) {
    this._indexDB.addItem(event.value, 'age');
  }

}
