import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { AppMaterialModule } from '../../shared/app-material/app-material-module';
import { SharedModule } from '../../shared/shared-module';
import { Course } from '../models/course';
import { CoursesService } from './../services/courses';
import { ErrorDialog } from '../../shared/components/error-dialog/error-dialog';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
  ],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss']
})
export class Courses implements OnInit{

  displayedColumns = ['_id','name','category'];
  courses$: Observable<Course[]> = new Observable<Course[]>();
  // Removed loading flag as async pipe handles loading state

  constructor(
    private CoursesService : CoursesService,
    public dialog : MatDialog
  ){}

  ngOnInit(){
    this.courses$ = this.CoursesService.getCourses()
    .pipe(
      catchError(error =>{
        this.onError('Erro ao carregar cursos.')
        return of([])
      })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialog, {
      data: errorMsg
    });
  }

}
