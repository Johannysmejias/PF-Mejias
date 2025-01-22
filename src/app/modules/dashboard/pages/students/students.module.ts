import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import {MatDialogModule} from '@angular/material/dialog';







@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogFormComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    SharedModule,
    MatDialogModule
  ],
  exports:[StudentsComponent]
})
export class StudentsModule { }
