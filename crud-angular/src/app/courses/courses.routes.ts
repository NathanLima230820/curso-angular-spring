import { Routes } from "@angular/router";
import { Courses } from "./containers/courses/courses";
import { CourseForm } from "./containers/course-form/course-form";
import { courseResolver } from "./guards/course.resolver";

export const COURSES_ROUTES: Routes = [
  { path: '', component : Courses },
  { path: 'new', component : CourseForm, resolve: { course: courseResolver } },
  { path: 'edit/:id', component : CourseForm, resolve: { course: courseResolver } }
];