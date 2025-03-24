import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable } from 'rxjs';
import { Course } from '../../modules/dashboard/pages/courses/models';  
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courseUrl = 'assets/courses.json';  
  deleteCourse: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  getCourseDetail(id:string):Observable<Course>{
    return this.httpClient.get<Course>(`${environment.baseApiUrl}/courses/${id}?embed=teachers`)
  }
  addCourse(payload:{name: string}):Observable<Course[]>{
    return this.httpClient.post<Course>(`${environment.baseApiUrl}/courses`, payload).pipe(concatMap(() => this.getCourses()))
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses/`)
  }


  getCourseById(id: string): Observable<any> {
    return this.httpClient.get<any[]>(this.courseUrl).pipe(
      map(courses => courses.find(course => course.id === id))  
    );
  }

  updateCourseById(id:string, data: {name: string}): Observable<Course[]>{
    return this.httpClient.patch<Course>(`${environment.baseApiUrl}/courses/${id}`, data).pipe(concatMap(() => this.getCourses()))
  }

  deleteCourseById(id: string):Observable<Course[]>{
    return this.httpClient.delete(`${environment.baseApiUrl}/courses/${id}`).pipe(concatMap(() => this.getCourses()))
  }
}
