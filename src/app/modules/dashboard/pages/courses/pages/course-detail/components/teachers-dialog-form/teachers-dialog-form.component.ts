import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../../../../students/models';
import { Teachers } from '../../../../models';

@Component({
  selector: 'app-teachers-dialog-form',
  standalone: false,

  templateUrl: './teachers-dialog-form.component.html',
  styleUrl: './teachers-dialog-form.component.scss'
})
export class TeachersDialogFormComponent {
  teachersForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<TeachersDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Teachers
  ) {
    this.teachersForm = this.fb.group({
      name: [null, [Validators.required]],
    });

    if (!!data) {
      this.isEditing = true;
      this.teachersForm.patchValue({
        name: data.name,
      });
    }
  }

  onSubmit() {
    if (this.teachersForm.invalid) {
      this.teachersForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.teachersForm.value);
      this.teachersForm.reset();
    }
  }
}
