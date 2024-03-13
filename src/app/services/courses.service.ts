import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { filter, map, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private _http: HttpClient
  ) {
  }

  getCourses(): Observable<Course[]> {
    return this._http.get<Course[]>('/api/courses').pipe(
      map(res => res["payload"].sort(sortCoursesBySeqNo)),
      shareReplay()
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this._http.put(`api/courses/${courseId}`, changes)
      .pipe(
        shareReplay()
      );
  }
}
