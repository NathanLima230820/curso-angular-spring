import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { AppMaterialModule } from '../../../shared/app-material/app-material-module';
import { SharedModule } from '../../../shared/shared-module';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialog } from '../../../shared/components/error-dialog/error-dialog';
import { CoursesGrid } from "../../components/courses-grid/courses-grid";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    CoursesGrid
],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss']
})
export class Courses implements OnInit{


  courses$: Observable<Course[]> = new Observable<Course[]>();

  constructor(
    private readonly CoursesService : CoursesService,
    public dialog : MatDialog,
    private readonly Router: Router,
    private readonly route: ActivatedRoute
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

  onAdd(){
    this.Router.navigate(['new'], {relativeTo: this.route})

  }

  onEdit(courses: Course){
    this.Router.navigate(['edit', courses._id], {relativeTo: this.route})
  }

}
