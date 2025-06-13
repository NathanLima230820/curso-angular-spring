import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { AppMaterialModule } from '../../app-material/app-material-module';

@Component({
  selector: 'app-error-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    AppMaterialModule
  ],
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.scss'
})
export class ErrorDialog {
  data: string = inject(MAT_DIALOG_DATA);
}
