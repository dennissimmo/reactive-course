import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { LoaderService } from "../services/loader.service";

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(
    private _loader: LoaderService
  ) {

  }

  ngOnInit() {
    this.isLoading$ = this._loader.loading$;
  }


}
