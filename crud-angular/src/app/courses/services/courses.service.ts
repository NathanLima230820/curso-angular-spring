import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Course } from '../models/course';
import { CoursePage } from '../models/course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/api/courses'

 constructor(private readonly http : HttpClient) {}

  getCourses(page: number, pageSize: number){
    return this.http.get<CoursePage>(this.API, {params: {page, pageSize}})
      .pipe(first(),
       //delay(3000)
       );
  }

  insertOrUpdate(record: Partial<Course>){

    if (record._id){
      return this.update(record);
    } else {
      return this.insert(record);
    }
  }

  private insert(record: Partial<Course>){
    return this.http.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.http.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  findById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.API}/${id}`);
  }

  delete(id: string){
    return this.http.delete(`${this.API}/${id}`).pipe(first());
  }

}
