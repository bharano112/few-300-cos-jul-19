import { createAction, props } from '@ngrx/store';
import { PersonEntity } from '../reducers/people.reducer';



let fakeId = 99;
export const addPerson = createAction(
  '[todosfeature] add person',
  (name: string) => {
    const newItem: PersonEntity = {
      id: 'F' + fakeId++,
      name
    };
    return { entity: newItem };
  }
);

export const addTodoItemSucceeded = createAction(
  '[todo feature] add todos item succeeded',
  props<{ oldId: string, entity: PersonEntity }>()
);
