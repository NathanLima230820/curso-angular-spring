import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material-module';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';
import { ErrorDialog } from './components/error-dialog/error-dialog';
import { CategoryPipe } from './pipes/category-pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorDialog,
    AppMaterialModule,
    CategoryPipe,
    ConfirmationDialog,
  ],
  exports: [
    ErrorDialog,
    AppMaterialModule,
    CategoryPipe,
    ConfirmationDialog,
  ]
})
export class SharedModule { }
