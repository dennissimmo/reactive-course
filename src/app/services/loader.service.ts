import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loadingSubject = new BehaviorSubject<boolean>(false);

  loading$:Observable<boolean> = this._loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    // this.loadingOn(); With such approach it will be turned on immediately, in the second one,
    // only when someone subscribes to it
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn(): void {
    this._loadingSubject.next(true);
  }

  loadingOff(): void {
    this._loadingSubject.next(false);
  }
}
