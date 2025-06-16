import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Courses } from './courses/courses';
import { CourseForm } from './course-form/course-form';

const courses_routes: Routes = [
  { path: '', component : Courses },
  { path: 'new', component : CourseForm }
];

@NgModule({
  imports: [RouterModule.forChild(courses_routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
