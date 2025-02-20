import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../../modules/dashboard/pages/courses/models';  
import { generateRandomString } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courseUrl = 'assets/courses.json';  
  deleteCourse: any;

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<Course[]> {
    return new Observable<Course[]>((subscriber) => {
      this.http.get<Course[]>(this.courseUrl).subscribe({
        next: (coursesFromJson) => {
          const courses = [...coursesFromJson]; 
          subscriber.next([...courses]);  

       
          const intervalId = setInterval(() => {
            courses.push({
              id: generateRandomString(6), 
              name: 'Nuevo Curso ' + (courses.length + 1),  
              teacher: 'Profesor ' + (courses.length + 1),  
            });

            subscriber.next([...courses]);  

            
            if (courses.length === coursesFromJson.length + 3) {
              clearInterval(intervalId);  
              subscriber.complete();  
            }
          }, 1000);
        },
        error: (err) => {
          subscriber.error('Error al cargar cursos desde el JSON: ' + err);
        },
      });
    });
  }

  getCourseById(id: string): Observable<any> {
    return this.http.get<any[]>(this.courseUrl).pipe(
      map(courses => courses.find(course => course.id === id))  // Buscar el curso por ID
    );
  }
}
