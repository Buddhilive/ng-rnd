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
      let td, th, i, t;
  
      const getTables = function (el: Document) {
        let arr: HTMLTableElement[] = [];
        const nodes = el.getElementsByTagName("table");
  
        for (let i = 0; i < nodes.length; i++) {
          arr.push(nodes[i]);
        }
        return arr;
      };
  
      this.tdEvent = flag;
  
      if (typeof el === "string") {
        if (type === "classname") {
          this.tables = getTables(document);
          for (i = 0; i < this.tables.length; i++) {
            if (this.tables[i].className.indexOf(el) === -1) {
              this.tables.splice(i, 1);
              i--;
            }
          }
        } else {
          el = document.getElementById(el);
        }
      }
  
      if (el && typeof el === "object") {
        if (el.nodeName === "TABLE") {
          this.tables[0] = el;
        } else {
          this.tables = getTables(el);
        }
      }
  
      for (t = 0; t < this.tables.length; t++) {
        th = this.tables[t].getElementsByTagName("th");
        for (i = 0; i < th.length; i++) {
          this.cellInit(th[i]);
        }
        td = this.tables[t].getElementsByTagName("td");
        for (i = 0; i < td.length; i++) {
          this.cellInit(td[i]);
        }
      }
  
      this.cellIndex();
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
