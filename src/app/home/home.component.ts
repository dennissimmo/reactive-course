import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from "../services/courses.service";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private _courses: CoursesService,
              private _loader: LoaderService) {

  }

  ngOnInit(): void {
    this.reloadCourses();
  }

  reloadCourses(): void {
    // this._loader.loadingOn();
    const courses$ = this._loader.showLoaderUntilCompleted(this._courses.getCourses());

    this.beginnerCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category === 'BEGINNER') )
    );
    this.advancedCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category === 'ADVANCED') )
    );
  }

  onCourseChanged() {
    this.reloadCourses();
  }
}




