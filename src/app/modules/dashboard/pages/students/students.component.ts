import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { Student } from './models/index';
import { generateRandomString } from '../../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';

@Component({
  selector: 'app-students',
  standalone: false,
  
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {

  
  displayedColumns: string[] = ['ID', 'name', 'age', 'email', 'actions'];
  students : Student[] = [ 
    {id:generateRandomString(6),
    name: "Laura",
    lastName: "Diaz",
    age: 22,
    email: "lauradiaz@gmail.com"},
    {id:generateRandomString(6),
    name: "Diego",
    lastName: "Gonzalez",
    age: 21,
    email: "dgonzalez@gmail.com"},
    {id:generateRandomString(6),
    name: "Sofia",
    lastName: "Vargas",
    age: 24,
    email: "sofi@gmail.com"},
    {
      id: generateRandomString(6),
      name: "Carlos",
      lastName: "Gonzalez",
      age: 30,
      email: "carlos.gonzalez@gmail.com"
    },
    {
      id: generateRandomString(6),
      name: "Maria",
      lastName: "Lopez",
      age: 28,
      email: "maria.lopez@gmail.com"
    },
    {
      id: generateRandomString(6),
      name: "Luis",
      lastName: "Fernandez",
      age: 35,
      email: "luis.fernandez@gmail.com"
    },
    {
      id: generateRandomString(6),
      name: "Elena",
      lastName: "Martinez",
      age: 24,
      email: "elena.martinez@gmail.com"
    },
    {
      id: generateRandomString(6),
      name: "Jose",
      lastName: "Perez",
      age: 32,
      email: "jose.perez@gmail.com"
    }
  ]

  editingStudentId: string | null = null;

  constructor( private matDialog: MatDialog){
    
  }

  

  onDelete(id:string){
    if(confirm("Estás seguro?")){
      this.students = this.students.filter((el)=> el.id != id)
    }
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
