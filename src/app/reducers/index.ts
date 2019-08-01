import { createReducer, on } from '@ngrx/store';
import * as appActions from '../actions/app.actions';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromError from './error.reducer';

export interface State {
  errors: fromError.ErrorState;
}

export const initialState: State = {
  errors: fromError.initialState
};

export const reducers: ActionReducerMap<State> = {
  errors: fromError.reducers
};

const selectHasErrorBranch = (state: State) => state.errors;

export const selectHasError = createSelector(selectHasErrorBranch, f => f.hasError);
export const selectMessage = createSelector(selectHasErrorBranch, f => f.message);



