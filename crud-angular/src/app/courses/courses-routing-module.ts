import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Courses } from './containers/courses/courses';
import { CourseForm } from './containers/course-form/course-form';

const courses_routes: Routes = [
  { path: '', component : Courses },
  { path: 'new', component : CourseForm },
  { path: 'edit/:id', component : CourseForm }
];

@NgModule({
  imports: [RouterModule.forChild(courses_routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
