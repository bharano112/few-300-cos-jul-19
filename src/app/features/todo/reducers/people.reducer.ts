
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/people.actions';

export interface PersonEntity {
  id: string;
  name: string;
}
export interface PersonEntityState extends EntityState<PersonEntity> {

}

export const adapter = createEntityAdapter<PersonEntity>();
const initialState: PersonEntityState = adapter.getInitialState();

const myreducer = createReducer(
  initialState,
  on(actions.addPerson, (state, action) => adapter.addOne(action.entity, state)),
  // on(actions.clearCompleted, (state, action) => adapter.removeMany(action.items.map(a => a.id), state)),
  // on(actions.todosLoadedSuccessfully, (state, action) => adapter.addAll(action.todos, state)),
  // on(actions.addTodoItemSucceeded, (state, action) => {
  //   const tmpState = adapter.removeOne(action.oldId, state);
  //   return adapter.addOne(action.entity, tmpState);
  // }),
  // on(actions.addTodoItemFailed, (state, action) => adapter.removeOne(action.id, state))
);


export function reducer(state: PersonEntityState = initialState, action): PersonEntityState {
  return myreducer(state, action);
}
