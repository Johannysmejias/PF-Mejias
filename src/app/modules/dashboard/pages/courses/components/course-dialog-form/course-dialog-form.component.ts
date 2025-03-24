import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentDialogFormComponent } from '../../../students/components/student-dialog-form/student-dialog-form.component';
import { Course } from '../../../courses/models';

@Component({
  selector: 'app-course-dialog-form',
  standalone: false,
  
  templateUrl: './course-dialog-form.component.html',
  styleUrl: './course-dialog-form.component.scss'
})
export class CourseDialogFormComponent {

  coursesForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Course
  ) {
    this.coursesForm = this.fb.group({
      name: [null, [Validators.required]],
      teacher: [null, [Validators.required]],
    });

    if (!!data) {
      this.isEditing = true;
      this.coursesForm.patchValue({
        name: data.name,
      });
    }
  }

  onSubmit() {
    if (this.coursesForm.invalid) {
      this.coursesForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.coursesForm.value);
      this.coursesForm.reset();
    }
  }
}
