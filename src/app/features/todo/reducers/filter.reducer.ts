import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/filter.actions';
import { tassign } from 'tassign';

export type FilterOptions = 'all' | 'incomplete' | 'complete';

export interface FilterState {
  listFilter: FilterOptions;
  filterText: string;
}

export const initialState: FilterState = {
  listFilter: 'all',
  filterText: ''
};

const myreducer = createReducer(
  initialState,
  on(actions.setFilter, (state, action) => tassign(state, { listFilter: action.filter })),
  on(actions.setFilterBy, (state, action) => tassign(state, { filterText: action.filterText }))
);

export function reducer(state: FilterState = initialState, action): FilterState {
  return myreducer(state, action);
}
