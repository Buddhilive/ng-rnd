import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild("fbDynamicGrid") fbDynamicGrid: ElementRef<HTMLTableElement>;

  numCells = 3;
  numRows = 5;
  gridData: Array<any>;

  currentRowIndex: number;
  currentCellIndex: number;
  cellInput: HTMLInputElement;

  isRowEnd: boolean = true;
  isColEnd: boolean = true;

  ngOnInit() {
    this.gridData = this.createDataGrid(this.numRows);
    console.log(this.gridData);
  }

  getRow(evt: MouseEvent, row: number, cell: number) {
    this.currentCellIndex = cell;
    this.currentRowIndex = row;
    this.cellInput = evt.target as HTMLInputElement;
    const tableRows = this.fbDynamicGrid.nativeElement.rows;
    const cellDiff = tableRows[this.currentRowIndex].cells.length - this.currentCellIndex;
    const rowDiff = tableRows.length - this.currentRowIndex;

    if(parseInt(this.cellInput.value) > 0 && this.cellInput.value.length > 0 && cellDiff > 0) {
      if(parseInt(this.cellInput.value) <= rowDiff) {
        this.isRowEnd = false;
      } else {
        this.isRowEnd = true;
      }
  
      if(parseInt(this.cellInput.value) <= cellDiff) {
        this.isColEnd = false;
      } else {
        this.isColEnd = true;
      }
    } else {
      this.isRowEnd = true;
      this.isColEnd = true;
    }

    console.log(this.currentCellIndex, cellDiff);
  }

  getCellDetails(evt: MouseEvent) {
    const cell = evt.target as HTMLTableCellElement;
    console.log(evt);
  }

  mergeCells(isRow: boolean) {
    const selectedCell: HTMLTableCellElement = this.fbDynamicGrid.nativeElement.rows[this.currentRowIndex].cells[this.currentCellIndex];
    if(isRow) {
      selectedCell.setAttribute('rowspan', this.cellInput.value);
      for (let i = this.currentRowIndex; i < (parseInt(this.cellInput.value) + this.currentRowIndex); i++) {
        if(i !== this.currentRowIndex) {
          this.fbDynamicGrid.nativeElement.rows[i].cells[this.currentCellIndex].remove();
        }
      }
    } else {
      selectedCell.setAttribute('colspan', this.cellInput.value);
      for (let i = this.currentCellIndex; i < (parseInt(this.cellInput.value) + this.currentCellIndex); i++) {
        if(i !== this.currentCellIndex) {
          this.fbDynamicGrid.nativeElement.rows[this.currentRowIndex].cells[i].remove();
        }
      }
    }
    console.log(selectedCell);
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
      newArray.push(0);
    }
    return newArray;
  }
}
