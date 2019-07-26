import * as actions from '../actions/list.actions';
import { createReducer, on } from '@ngrx/store';

export interface CompleteState {
  ids: string[];
}

export const initialState: CompleteState = {
  ids: []
};

const myreducer = createReducer(
  initialState,
  on(actions.todoItemCompleted, (state, action) => {
    return {
      ids: [action.item.id, ...state.ids]
    };
  }),
  on(actions.clearCompleted, () => ({ ids: [] })),
  on(actions.todosLoadedSuccessfully, (state, action) => ({ ids: action.completedIds }))
);



export function reducer(state: CompleteState = initialState, action): CompleteState {
  return myreducer(state, action);
}
