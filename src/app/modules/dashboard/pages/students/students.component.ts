import { Component, OnInit } from '@angular/core';
import { Student } from './models/index';
import { generateRandomString } from '../../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { StudentsService } from '../../../../core/services/students.service';
import { interval } from 'rxjs/internal/observable/interval';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent  implements OnInit{

  
  displayedColumns: string[] = ['ID', 'name', 'age', 'email', 'actions'];
  editingStudentId: string | null = null;
  students:Student[] = [];
  selectedStudent: any;
  isLoading = true;
  hasError = false;
  studentsSubscription?: Subscription;
  myInterval$ = interval(1000);


  constructor( private matDialog: MatDialog, private StudentsService : StudentsService){}

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.studentsSubscription = this.StudentsService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al obtener estudiantes:", err);
        this.isLoading = false;
      }
    });
  
    this.myInterval$.subscribe((value) => {
      console.log(`Intervalo: ${value}`);
    });
  
    }, 2000);
    
  }
  
  ngOnDestroy(): void {
    this.studentsSubscription?.unsubscribe();
  }

  onDelete(id:string){
    if(confirm("Estás seguro?")){
      this.students = this.students.filter(student => student.id !== id)
    }
  }

  getStudentDetails(id: string){
    this.StudentsService.getStudentById(id).subscribe(student => {
      this.selectedStudent = student;
    })
  }

  onEdit(student: Student): void {
    this.editingStudentId = student.id;

    this.matDialog
      .open(StudentDialogFormComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (formValue) => {
          if (!!formValue) {
            this.students = this.students.map((student) =>
              student.id === this.editingStudentId
                ? { ...student, ...formValue }
                : student
            );
            this.editingStudentId = null;
          }
        },
      });
  }
  onCreateStudent(): void {
    this.matDialog
      .open(StudentDialogFormComponent)
      .afterClosed()
      .subscribe({
        next: (formValue) => {
          if (!!formValue) {
            this.students = [
              ...this.students,
              {
                id: generateRandomString(6),
                ...formValue,
              },
            ];
          }
        },
      });
  }
}
