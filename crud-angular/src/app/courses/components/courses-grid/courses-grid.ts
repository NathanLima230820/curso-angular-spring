import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppMaterialModule } from '../../../shared/app-material/app-material-module';
import { CategoryPipe } from "../../../shared/pipes/category-pipe";
import { Course } from '../../models/course';

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
  @Output() add = new EventEmitter
  @Output() edit = new EventEmitter
  @Output() delete = new EventEmitter

  readonly displayedColumns = ['_id','name','category', 'actions'];

  constructor(){

  }

  onAdd(){
   this.add.emit(true);

  }

  onEdit(courses: Course){
    this.edit.emit(courses);
  }

  onDelete(courses: Course){
    this.delete.emit(courses)
  }
}
