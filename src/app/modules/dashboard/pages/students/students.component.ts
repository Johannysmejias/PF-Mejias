import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { Student } from './models/index';
import { generateRandomString } from '../../../shared/utils';

@Component({
  selector: 'app-students',
  standalone: false,
  
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {

  studentsForm : FormGroup;

  students : Student[] = []

  constructor(private fb: FormBuilder){
    this.studentsForm = this.fb.group({
      name:[null, [Validators.required]],
      lastName: [null, [Validators.required]]
    })
  }

  onSubmit(){
    if(this.studentsForm.invalid){
      this.studentsForm.markAllAsTouched();
    }
    else{
      console.log(this.studentsForm.value);

      this.students.push({
        id : generateRandomString(6),
        ...this.studentsForm.value,
      });
    }
  }
}
