import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseDialogFormComponent } from './components/course-dialog-form/course-dialog-form.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { TeachersDialogFormComponent } from './pages/course-detail/components/teachers-dialog-form/teachers-dialog-form.component';
@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogFormComponent,
    CourseDetailComponent,
    TeachersDialogFormComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports:[
    CoursesComponent
  ]
})
export class CoursesModule { }
