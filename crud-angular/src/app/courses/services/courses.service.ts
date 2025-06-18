import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/api/courses'

 constructor(private readonly http : HttpClient) {}

  getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.API)
      .pipe(first(),
       //delay(3000)
       );
  }

  insertOrUpdate(record: Partial<Course>){
    return this.http.post<Course>(this.API, record).pipe(first());
  }
}
