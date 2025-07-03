import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppMaterialModule } from '../../app-material/app-material-module';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [
    MatDialogModule,
    AppMaterialModule
  ],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss'
})

export class ConfirmationDialog {

  readonly dialogRef = inject(MatDialogRef<ConfirmationDialog>);
  readonly data = inject<string>(MAT_DIALOG_DATA);

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }

}
