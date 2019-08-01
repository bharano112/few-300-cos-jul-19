import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as appActions from '../../../actions/app.actions';
import * as listActions from '../actions/list.actions';
import * as filterActions from '../actions/filter.actions';
import { createAction } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AppEffects {

  startFeature$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      mergeMap(() => [
        listActions.loadTodos(),
        filterActions.loadFilter()
      ])
    )
  );

  // error$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(appActions.appError),
  //     map(() =>
  //       appActions.appError()
  //     )
  //   )
  // );

  constructor(private actions$: Actions) { }
}
