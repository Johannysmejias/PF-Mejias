import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-student-dialog-form',
  standalone: false,
  
  templateUrl: './student-dialog-form.component.html',
  styleUrl: './student-dialog-form.component.scss'
})
export class StudentDialogFormComponent {

  studentsForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student
  ) {
    this.studentsForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      age: [null, [Validators.required]], 
      email: [null, [Validators.required, Validators.email]], 
    });

    if (!!data) {
      this.isEditing = true;
      this.studentsForm.patchValue({
        name: data.name,
        lastName: data.lastName,
        age: data.age,
        email : data.email
      });
    }
  }

  onSubmit() {
    if (this.studentsForm.invalid) {
      this.studentsForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.studentsForm.value);
      this.studentsForm.reset();
    }
  }
}
