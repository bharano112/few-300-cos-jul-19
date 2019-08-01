import { createAction, props } from '@ngrx/store';

export const applicationStarted = createAction(
  '[app] application started'
);

export const showMessage = createAction(
  '[app] show message',
  props<{ message: string, level: string }>()
);

export const dismissMessage = createAction(
  '[app] dismiss message'
);
