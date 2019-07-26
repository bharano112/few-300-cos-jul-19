
export const featureName = 'todosFeature';

import * as fromList from './list.reducer';
import * as models from '../models';
import * as fromCompleted from './completed.reducer'; // this is a new branch
import * as fromUiHints from './ui-hints.reducer';
import * as fromFilter from './filter.reducer';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { filter } from 'minimatch';

export interface TodosState {
  list: fromList.TodoListState;
  completed: fromCompleted.CompleteState;
  filter: fromFilter.FilterState;
  ui: fromUiHints.UiHintsState;
}

export const reducers: ActionReducerMap<TodosState> = {
  list: fromList.reducer,
  completed: fromCompleted.reducer,
  filter: fromFilter.reducer,
  ui: fromUiHints.reducer
};


// 1. create a fature selector
const selectTodosFeatures = createFeatureSelector<TodosState>(featureName);

// 2. Create a selector for each branch of the feature
const selectListBranch = createSelector(selectTodosFeatures, f => f.list);
const selectCompletedBranch = createSelector(selectTodosFeatures, f => f.completed);
const selectFilterBranch = createSelector(selectTodosFeatures, f => f.filter);
const selectUiHints = createSelector(selectTodosFeatures, f => f.ui);

// 3. Any "helpers"
const { selectAll: selectAllTodoEntities } = fromList.adapter.getSelectors(selectListBranch);
const selectCompletedIds = createSelector(selectCompletedBranch, b => b.ids);

export const selectCurrentFilter = createSelector(selectFilterBranch, f => f.listFilter);
export const selectFilterText = createSelector(selectFilterBranch, f => f.filterText);

export const selectFeatureLoaded = createSelector(selectUiHints, h => h.listLoaded);

// 4. exported Selectors for the components
export const selectUnfilteredTodoList = createSelector(
  selectAllTodoEntities,
  selectCompletedIds,
  (todos, completed) => todos.map(todo => {
    return {
      id: todo.id,
      description: todo.description,
      completed: completed.some(id => id === todo.id),
      isTmp: todo.id.startsWith('F')
    } as models.ListItemModel;
  }));

export const selectTodoListBeforSearch = createSelector(
  selectUnfilteredTodoList,
  selectCurrentFilter,
  (todos, filterOption) => {
    if (filterOption === 'all') {
      return todos;
    }
    if (filterOption === 'complete') {
      return todos.filter(t => t.completed === true);
    }

    if (filterOption === 'incomplete') {
      return todos.filter(t => t.completed === false);
    }
  });

export const selectTodosList = createSelector(
  selectTodoListBeforSearch,
  selectFilterText,
  (todos, filterText) => {
    if (filterText === '') {
      return todos;
    }
    const re = new RegExp(filterText, 'i');
    return todos.filter(todo => todo.description.match(re));
  }
);
