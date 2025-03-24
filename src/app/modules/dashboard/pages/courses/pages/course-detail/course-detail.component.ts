import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course, Teachers } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TeachersDialogFormComponent } from './components/teachers-dialog-form/teachers-dialog-form.component';
import { generateRandomString } from '../../../../../../shared/utils';

@Component({
  selector: 'app-course-detail',
  standalone: false,

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {
  isLoading = false;
  course: Course | null = null;
  teachers: Teachers[] = [];
  displayedColumns: string[] = ['ID', 'name', 'actions'];
  errorMessage = '';
  teachersSubscription?: Subscription;
  myInterval$ = interval(1000);
  editingTeacherId: string | null = null;


  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.coursesService
      .getCourseDetail(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (course) => {
          this.course = course;
          this.errorMessage = '';
        },
        complete: () => {
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;

          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.errorMessage = 'El curso no existe';
            }
          }
        },
      });
  }

  ngOnDestroy(): void {
      this.teachersSubscription?.unsubscribe();
    }
  
    onDelete(id: string) {
      if (confirm("Estás seguro?")) {
        this.teachers = this.teachers.filter(teacher => teacher.id !== id);
      }
    }
  
  
    onEdit(teacher : Teachers): void {
      this.editingTeacherId = teacher.id;
  
      this.matDialog
        .open(TeachersDialogFormComponent, {
          data: teacher,
        })
        .afterClosed()
        .subscribe({
          next: (formValue) => {
            if (!!formValue) {
              this.teachers = this.teachers.map((teacher) =>
                teacher.id === this.editingTeacherId
                  ? { ...teacher, ...formValue }
                  : teacher
              );
              this.editingTeacherId = null;
            }
          },
        });
    }
  
    onCreateTeacher(): void {
      this.matDialog
        .open(TeachersDialogFormComponent)
        .afterClosed()
        .subscribe({
          next: (formValue) => {
            if (!!formValue) {
              this.teachers = [
                ...this.teachers,
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