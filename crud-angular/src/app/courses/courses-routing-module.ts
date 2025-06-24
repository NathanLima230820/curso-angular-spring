import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Courses } from './containers/courses/courses';
import { CourseForm } from './containers/course-form/course-form';
import { courseResolver } from './guards/course.resolver';

const courses_routes: Routes = [
  { path: '', component : Courses },
  { path: 'new', component : CourseForm, resolve: { course: courseResolver } },
  { path: 'edit/:id', component : CourseForm, resolve: { course: courseResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(courses_routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
