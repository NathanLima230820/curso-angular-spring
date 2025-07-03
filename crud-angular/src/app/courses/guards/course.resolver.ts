import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

export const courseResolver: ResolveFn<Observable<Course>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const service = inject(CoursesService);
  if(route.params?.['id']){
    return service.findById(route.params['id']);
  } else {
    return of<Course>({ _id: '', name: '', category: '' })
    }
  };

