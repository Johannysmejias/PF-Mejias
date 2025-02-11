import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { Student } from '../../modules/dashboard/pages/students/models';
import { generateRandomString } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private studentUrl = 'assets/students.json'

  constructor(
    private http: HttpClient
  ) { }


  getStudents(): Observable<Student[]> {
    return new Observable<Student[]>((subscriber) => {
      this.http.get<Student[]>('assets/students.json').subscribe({
        next: (studentsFromJson) => {
          const students = [...studentsFromJson]; 
          subscriber.next([...students]); 
  
          const intervalId = setInterval(() => {
            students.push({
              id: generateRandomString(6),
              name: 'NUEVO',
              lastName: 'ESTUDIANTE ',
              age: 23,
              email:'example@email.com' + students.length,
            });
  
            subscriber.next([...students]); 
  
            if (students.length === studentsFromJson.length + 3) {
              clearInterval(intervalId);
              subscriber.complete();
            }
          }, 1000);
        },
        error: (err) => {
          subscriber.error('Error al cargar estudiantes desde el JSON: ' + err);
          
        },
      });
    });
  }
  

  getStudentById(id:string):Observable<any>{
    return this.http.get<any[]>(this.studentUrl).pipe(
      map(students => students.find(students=>students.id === id))
    );
  }
}
