import { createReducer, on } from '@ngrx/store';
import * as appActions from '../actions/app.actions';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';


export interface ErrorState {
  hasError: boolean;
  message: string;
  level: string;
}

export const initialState: ErrorState = {
  hasError: false,
  message: '',
  level: ''
};


const myReducer = createReducer(initialState,
  on(appActions.showMessage, (state, action) => ({ message: action.message, level: action.level, hasError: true })),
  on(appActions.dismissMessage, (state, action) => ({ message: '', level: '', hasError: false }))

);

export function reducers(state: ErrorState = initialState, action): ErrorState {
  return myReducer(state, action);
}
