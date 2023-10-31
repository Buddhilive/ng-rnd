import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompAComponent } from './comp-a.component';

@NgModule({
  declarations: [CompAComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CompAComponent
  ]
})
export class CompAModule { }
