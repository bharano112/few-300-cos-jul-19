import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectHasError } from './reducers';
import { applicationStarted, showMessage } from './actions/app.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'few300';

  hasError$: Observable<boolean>;

  constructor(private store: Store<State>) { }


  ngOnInit() {
    this.store.dispatch(applicationStarted());
    this.hasError$ = this.store.select(selectHasError);
  }

}
