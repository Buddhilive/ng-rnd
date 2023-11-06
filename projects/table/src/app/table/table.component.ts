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

  mergeCells(isColSpan: boolean) {
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

    if(isColSpan) {
      for (let row in colSpanArray) {
        const rowIndex = rowSpanArray[row];
        const colSpan = colSpanArray[row][rowIndex];
        let colSpanValue = 0;
  
        for(let i in colSpan) {
          const itemColSpan = this.fbDynamicGrid.nativeElement.rows[rowIndex].cells[colSpan[i]].colSpan;
          colSpanValue += itemColSpan;
        }
        this.fbDynamicGrid.nativeElement.rows[rowIndex].cells[colSpan[0]].colSpan = colSpanValue;
        for(let i = 1; i < colSpan.length; i++) {
          this.fbDynamicGrid.nativeElement.rows[rowIndex].cells[colSpan[0] + 1].remove();
        }
      }
    } else {
      if(rowSpanArray.length > 1) {
        this.fbDynamicGrid.nativeElement.rows[rowSpanArray[0]].cells[colSpanArray[0][0]].rowSpan = rowSpanArray.length;
        for (let i = 1; i < rowSpanArray.length; i++) {
          this.fbDynamicGrid.nativeElement.rows[rowSpanArray[i]].cells[colSpanArray[i][i][0]].remove();
        }
      }
    }

    
    console.log(this.selectedCells, rowSpanArray, colSpanArray);
    this.clearSelection();
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

  private clearSelection() {
    this.fbDynamicGrid.nativeElement.querySelectorAll('.selected').forEach((el: HTMLTableCellElement) => {
      el.classList.remove('selected');
    });
    this.selectedCells = [];
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
