import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompBComponent } from './comp-b.component';

@NgModule({
  declarations: [CompBComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CompBComponent
  ]
})
export class CompBModule { }
