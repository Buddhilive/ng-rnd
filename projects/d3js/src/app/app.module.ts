import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompAModule, CompBModule } from 'projects/multi-entry/public_api';
import { IndexdbComponent } from './indexdb/indexdb.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
/* import { CompAModule } from 'multi-entry/comp-a';
import { CompBModule } from 'multi-entry/comp-b'; */
@NgModule({
  declarations: [
    AppComponent,
    IndexdbComponent
  ],
  imports: [
    BrowserModule,
    CompAModule,
    CompBModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
