import { Component, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogServiceService } from './dialog-service.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CsiDialogComponentComponent } from './csi-dialog-component/csi-dialog-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CsiDialogComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DialogServiceService, DialogService]
})
export class AppComponent {
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;
  private dialogService = inject(DialogServiceService);
  private _dynamicDialogService = inject(DialogService)
  openDialog() {
    // this.dialogService.open();
    /* this._dynamicDialogService.open(CsiDialogComponentComponent, {
      width: '60%',
      height: '60vh'
    }) */
   // this.dialogService.extractTemplateRefs(AppComponent);
   this.dialogRef.nativeElement.show();
  }
}
