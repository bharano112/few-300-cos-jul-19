import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/filter.actions';
import { tassign } from 'tassign';

export interface AssignmentsState {

}

export const initialState: AssignmentsState = {

};
// list state, person state, assignment state
const myreducer = createReducer(
  initialState,
  // on(actions.setFilter, (state, action) => tassign(state, { listFilter: action.filter })),
  // on(actions.setFilterBy, (state, action) => tassign(state, { filterText: action.filterText }))
);

export function reducer(state: AssignmentsState = initialState, action): AssignmentsState {
  return myreducer(state, action);
}
