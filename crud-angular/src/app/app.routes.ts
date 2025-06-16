//import { routes } from './app.routes';
import { Routes } from '@angular/router';
//import { Courses } from './courses/courses/courses';

export const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: 'courses'},
  { path: 'courses',
    loadChildren: () => import('./courses/courses-module').then(m => m.CoursesModule)
  }
];
