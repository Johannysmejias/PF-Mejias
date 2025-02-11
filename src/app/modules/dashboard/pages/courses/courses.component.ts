import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from './models/index';  
import { generateRandomString } from '../../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogFormComponent } from './components/course-dialog-form/course-dialog-form.component'; 
import { CoursesService } from '../../../../core/services/courses.service';  
import { interval } from 'rxjs/internal/observable/interval';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html', 
  styleUrl: './courses.component.scss'
})

export class CoursesComponent implements OnInit, OnDestroy {
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
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.coursesSubscription = this.coursesService.getCourses().subscribe({
        next: (data) => {
          this.courses = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error al obtener cursos:", err);
          this.isLoading = false;
        }
      });

      this.myInterval$.subscribe((value) => {
        console.log(`Intervalo: ${value}`);
      });

    }, 2000);
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
