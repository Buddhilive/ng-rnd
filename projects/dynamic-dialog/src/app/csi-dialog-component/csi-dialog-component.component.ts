import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-csi-dialog-component',
  standalone: true,
  imports: [DialogModule, DropdownModule],
  template: `
    <!-- <p-dialog
      header="Edit Profile"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '25rem' }"
      (onHide)="onClose()"
    > -->
    <span class="p-text-secondary block mb-5">Update your information.</span>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-6rem">Username</label>
      <input pInputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-6rem">Email</label>
      <input pInputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <p-dropdown [options]="cities" optionLabel="name" appendTo="body"></p-dropdown>
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <p-dropdown [options]="cities" optionLabel="name" appendTo="body"></p-dropdown>
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <p-dropdown [options]="cities" optionLabel="name" appendTo="body"></p-dropdown>
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <p-dropdown [options]="cities" optionLabel="name" appendTo="body"></p-dropdown>
    </div>
    <div class="flex justify-content-end gap-2">
      <button (click)="visible = !visible">Cancel</button>
    </div>
    <!-- </p-dialog> -->
  `,
  styles: `:host {
    height: 40vh;
  }`,
})
export class CsiDialogComponentComponent {
  @Input() visible = true;
  @Output() dialogClose = new EventEmitter();

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  onClose() {
    this.dialogClose.emit('Closed');
  }
}
