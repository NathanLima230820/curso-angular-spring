import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/api/courses'

 constructor(private readonly http : HttpClient) {}

  getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.API)
      .pipe(
      //delay(3000),
       first());
  }

  insertOrUpdate(record: Course){
    return this.http.post<Course>(this.API, record).pipe(first());
  }
}
