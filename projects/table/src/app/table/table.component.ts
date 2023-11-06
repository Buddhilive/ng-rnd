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
        row: tableRef.getAttribute('aria-rowindex'),
        cell: tableRef.cellIndex
      };    
      this.selectedCells.push(cellInfo);
    } else {
      const uniqueArray = this.selectedCells;
      this.selectedCells = uniqueArray.filter((obj: any) => obj.row != tableRef.getAttribute('aria-rowindex') || obj.cell != tableRef.cellIndex);
    }

    this.selectedCells.sort((a, b) => {
      if (a.row === b.row) {
        return a.cell - b.cell;
      }
      return a.row - b.row;
    });

    console.info(this.selectedCells);
  }

  mergeCells() {
    const colSpanArray: Array<any> = [];
    const rowSpanArray: Array<any> = [];
    
    this.selectedCells.map((cell: any) => {
      if(!rowSpanArray.includes(cell.row)) {
        rowSpanArray.push(cell.row);
      }
    });

    for (let i in rowSpanArray) {
      const cols = [];
      for (let cell in this.selectedCells) {
        if(this.selectedCells[cell].row == rowSpanArray[i]) {
          cols.push(this.selectedCells[cell].cell);
        }
      }
      colSpanArray.push({
        [rowSpanArray[i]]: cols
      });
    }

    for (let row in colSpanArray) {
      const rowIndex = rowSpanArray[row];
      const colSpan = colSpanArray[row][rowIndex];
      this.fbDynamicGrid.nativeElement.rows[rowIndex].cells[colSpan[0]].colSpan = colSpan.length;
      for(let i = 1; i < colSpan.length; i++) {
        console.log(colSpan[i], this.fbDynamicGrid.nativeElement.rows[rowIndex].cells[colSpan[0] + 1]);
        this.fbDynamicGrid.nativeElement.rows[rowIndex].cells[colSpan[0] + 1].remove();
      }
      console.log(colSpan[colSpan.length - 1]);
    }
    this.selectedCells = [];
    console.log(this.selectedCells, rowSpanArray, colSpanArray);

  }

  rowUpdated(evt: Event) {
    console.log(evt);
  }

  private isInOrder(numArray: Array<number>) {
    for(let i = numArray[0]; i < (numArray.length + numArray[0]); i++) {
      if(numArray[i] !== (i + numArray[0])) {
        return false;
      }
    }
    return true;
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
