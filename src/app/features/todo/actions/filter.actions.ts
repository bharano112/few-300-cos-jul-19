import { createAction, props } from '@ngrx/store';
import { FilterOptions } from '../reducers/filter.reducer';


export const setFilter = createAction(
  '[todosFeature] filter set',
  props<{ filter: FilterOptions }>()
);


export const setFilterBy = createAction(
  '[todosFeature] filter set by',
  props<{ filterText: string }>()
);

export const loadFilter = createAction(
  '[todos feature] load filter'
);
