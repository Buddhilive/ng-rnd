import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedipsTableService {
  private tables = [];
  private tdEvent = false;
  private showIndex = false;
  private markNonEmpty = true;

  constructor() { }

  onMouseDown(el: any, flag: boolean, type: string) {
    // Your implementation for the onMouseDown function
  }

  cellInit(c: any) {
    // Your implementation for the cellInit function
  }

  cellIgnore(c: any) {
    // Your implementation for the cellIgnore function
  }

  handlerOnMouseDown(e: any) {
    // Your implementation for the handlerOnMouseDown function
  }

  getParentCell(node: any) {
    // Your implementation for the getParentCell function
  }

  merge(mode: string, clear?: boolean, table?: any) {
    // Your implementation for the merge function
  }

  mergeCells(cl: any, idx: number, pos1: number, pos2: number, mode: string, clear?: boolean) {
    // Your implementation for the mergeCells function
  }

  maxCols(table: any) {
    // Your implementation for the maxCols function
  }

  split(mode: string, table?: any) {
    // Your implementation for the split function
  }

  getTable(table: any) {
    // Your implementation for the getTable function
  }

  row(table: any, mode: string, index?: number) {
    // Your implementation for the row function
  }

  column(table: any, mode: string, index?: number) {
    // Your implementation for the column function
  }

  mark(flag: boolean, el: any, row?: number, col?: number) {
    // Your implementation for the mark function
  }

  removeSelection() {
    // Your implementation for the removeSelection function
  }

  cellList(table: any) {
    // Your implementation for the cellList function
  }

  relocate(from: any, to: any) {
    // Your implementation for the relocate function
  }

  cellIndex(flag?: boolean) {
    // Your implementation for the cellIndex function
  }
}
