import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-material/app-material-module';
import { CategoryPipe } from "../../shared/pipes/category-pipe";
import { Course } from '../models/course';

@Component({
  selector: 'app-courses-grid',
  imports: [
    AppMaterialModule,
    CategoryPipe
],
  templateUrl: './courses-grid.html',
  styleUrl: './courses-grid.scss'
})
export class CoursesGrid {

  @Input() courses: Course[] = [];
  readonly displayedColumns = ['_id','name','category', 'actions'];

  constructor(private readonly Router: Router,
    private readonly route: ActivatedRoute
  ){

  }

  onAdd(){
    this.Router.navigate(['new'], {relativeTo: this.route})

  }
}
