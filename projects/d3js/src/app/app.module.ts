import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompAModule, CompBModule } from 'projects/multi-entry/public_api';
/* import { CompAModule } from 'multi-entry/comp-a';
import { CompBModule } from 'multi-entry/comp-b'; */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CompAModule,
    CompBModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
