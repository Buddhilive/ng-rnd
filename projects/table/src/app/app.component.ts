import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  numCells = 3;
  numRows = 3;
  gridData: Array<any>;

  ngOnInit() {
    this.gridData = this.createDataGrid(this.numRows);
    console.log(this.gridData);
  }

  getRow(evt: MouseEvent) {
    evt.stopPropagation();
    const cell = evt.target as HTMLInputElement;
    console.log(this.gridData);
    if(cell.checked) {
      this.gridData[cell.dataset.row][cell.dataset.cell] = 1;
    } else {
      this.gridData[cell.dataset.row][cell.dataset.cell] = 0;
    }
    console.log(this.gridData);
  }

  getSelectedCell(evt: MouseEvent) {
    // console.log(evt, this.gridData);
  }

  private createDataGrid(rows: number) {
    const newArray = [];
    for(let i = 0; i < rows; i++) {
      newArray.push(this.createCells(this.numCells));
    }
    return newArray;
  }

  private createCells(cells: number) {
    const newArray = [];
    for(let i = 0; i < cells; i++) {
      newArray.push(0);
    }
    return newArray;
  }

}
