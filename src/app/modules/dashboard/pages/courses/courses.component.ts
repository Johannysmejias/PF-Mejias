import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Course } from './models/index';
import { generateRandomString } from '../../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogFormComponent } from './components/course-dialog-form/course-dialog-form.component';
import { CoursesService } from '../../../../core/services/courses.service';
import { interval } from 'rxjs/internal/observable/interval';
import { map, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

@Injectable({
  providedIn: 'root',
})

export class CoursesComponent implements OnInit, OnDestroy {
  [x: string]: any;
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  displayedColumns: string[] = ['id', 'name', 'teacher', 'actions'];
  editingCourseId: string | null = null;
  courses: Course[] = [];
  selectedCourse: any;
  isLoading = true;
  hasError = false;
  coursesSubscription?: Subscription;
  myInterval$ = interval(1000);
  isEditing: any;
  coursesForm: any;

  constructor(
    private matDialog: MatDialog,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.coursesSubscription = this.coursesService.getCourses().pipe(
      map((data: any[]) => data.map(item => ({
        id: item.id,
        name: item.name,
        teacher: item.teacher
      }) as Course))
    ).subscribe({
      next: (data) => {
        this.courses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener cursos:', err.message);
        this.hasError = true;
        this.isLoading = false;
      }
    });

    // this.myInterval$.subscribe((value) => {
    //   console.log(`Intervalo: ${value}`);
    // });


  }

  ngOnDestroy(): void {
    this.coursesSubscription?.unsubscribe();
  }

  onDelete(id: string) {
    if (confirm("Estás seguro?")) {
      this.courses = this.courses.filter(course => course.id !== id);
    }
  }


  onEdit(course: Course): void {
    this.editingCourseId = course.id;

    this.matDialog
      .open(CourseDialogFormComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (formValue) => {
          if (!!formValue) {
            this.courses = this.courses.map((course) =>
              course.id === this.editingCourseId
                ? { ...course, ...formValue }
                : course
            );
            this.editingCourseId = null;
          }
        },
      });
  }

  onCreateCourse(): void {
    this.matDialog
      .open(CourseDialogFormComponent)
      .afterClosed()
      .subscribe({
        next: (formValue) => {
          if (!!formValue) {
            this.courses = [
              ...this.courses,
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
