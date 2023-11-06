import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild("fbDynamicGrid") fbDynamicGrid: ElementRef<HTMLTableElement>;

  numCells = 6;
  numRows = 5;
  gridData: Array<any>;
  selectedCells: Array<any> = []

  constructor() { }

  ngOnInit() {
    this.gridData = this.createDataGrid(this.numRows);
  }

  selectedCell(evt: MouseEvent) {
    const tableRef = evt.target as HTMLTableCellElement;
    tableRef.classList.toggle('selected');

    if(tableRef.classList.contains('selected')) {
      const cellInfo = {
        row: tableRef.ariaRowIndex,
        cell: tableRef.cellIndex
      };    
      this.selectedCells.push(cellInfo);
    } else {
      const uniqueArray = this.selectedCells;
      this.selectedCells = uniqueArray.filter((obj: any) => obj.row != tableRef.ariaRowIndex || obj.cell != tableRef.cellIndex);
      //console.log(uniqueArray)
    }


    console.info(this.selectedCells);
  }

  private createDataGrid(rows: number) {
    const newArray = [];
    for (let i = 0; i < rows; i++) {
      newArray.push(this.createCells(this.numCells));
    }
    return newArray;
  }

  private createCells(cells: number) {
    const newArray = [];
    
    for (let i = 0; i < cells; i++) {
      newArray.push(this.newCellData());
    }
    return newArray;
  }

  private newCellData() {
    return {
      colspan: 1,
      rowspan: 1
    };
  }

}
