import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/list.reducer';



let fakeId = 99;
export const addTodoItem = createAction(
  '[todosfeature] add item',
  (description: string) => {
    const newItem: TodoEntity = {
      id: 'F' + fakeId++,
      description
    };
    return { entity: newItem };
  }
);

export const addTodoItemSucceeded = createAction(
  '[todo feature] add todos item succeeded',
  props<{ oldId: string, entity: TodoEntity }>()
);

export const addTodoItemFailed = createAction(
  '[todosfeature] add todo failed',
  props<{ id: string, message: string }>()
);


export const todoItemCompleted = createAction(
  '[todofeature] todo item completed',
  props<{ item: TodoEntity }>()
);

export const clearCompleted = createAction(
  '[todofeature] completed todo cleared',
  props<{ items: TodoEntity[] }>()
);

export const clearCompletedFailed = createAction(
  '[todofeature] completed todo cleared failed',
  props<{ items: TodoEntity[] }>()
);

export const deleteTodo = createAction(
  '[todofeature] delete todo ',
  props<{ entity: TodoEntity }>()
);

export const deleteTodoFailed = createAction(
  '[todofeature] delete todo Failed',
  props<{ entity: TodoEntity, message: string }>()
);

export const todosLoadedSuccessfully = createAction(
  '[todosFeature] todos loaded successfully',
  props<{ completedIds: string[], todos: TodoEntity[] }>()
);

export const loadTodos = createAction(
  '[todos feature] load todos'
);
