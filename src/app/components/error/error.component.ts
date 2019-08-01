import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectHasError, selectMessage, State } from '../../reducers';
import * as appActions from '../../actions/app.actions';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  message$: Observable<string>;
  hasError$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.hasError$ = this.store.select(selectHasError);
    this.message$ = this.store.select(selectMessage);
  }

  dismiss() {
    this.store.dispatch(appActions.dismissMessage());
  }
}
