import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, filter, switchMap, catchError, concatMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as filterActions from '../actions/filter.actions';
import * as appActions from '../../../actions/app.actions';
import { FilterOptions } from '../reducers/filter.reducer';
import { TodoEntity } from '../reducers/list.reducer';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { todosLoadedSuccessfully } from '../actions/list.actions';
import * as listActions from '../actions/list.actions';

@Injectable()
export class FilterEffects {

  // deleteTodos = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(listActions.deleteTodo),
  //     concatMap(actions => this.client.delete(environment.todosUrl + '/' + actions.entity.id))
  //       .pipe(
  //         map(x => ({ type: 'noop' })),
  //         filter(x => false),
  //         catchError((err) => of(listActions.deleteTodoFailed({ entity: action.entity, message: err.error })))
  //       )
  //   )
  // );

  clearAll = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.clearCompleted),
      mergeMap(action => action.items.map(entity => listActions.deleteTodo({ entity })))
    ),
    { dispatch: true });

  markComplete = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.todoItemCompleted),
      switchMap(action => this.client.put(environment.todosUrl + '/completed/' + action.item.id, action.item))
    ),
    { dispatch: false });

  saveTodo = createEffect(() => {
    return this.actions$.pipe(
      ofType(listActions.addTodoItem),
      concatMap(
        (originalAction) => this.client.post<TodoEntity>(environment.todosUrl, { description: originalAction.entity.description })
          .pipe(
            map(response => listActions.addTodoItemSucceeded(
              { oldId: originalAction.entity.id, entity: response })),
            catchError((err) => of(listActions.addTodoItemFailed({ id: originalAction.entity.id, message: err.error })))
          )
      )
    );
  });

  loadTodos = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.loadTodos),
      switchMap(
        () => this.client.get<TodosResponse>(environment.todosUrl).pipe(
          map(r => r.data),
          map(todos => {
            const completedIds = todos.filter(t => t.completed).map(t => t.id);
            const todoEntities = todos.map(todo => ({
              id: todo.id,
              description: todo.description
            } as TodoEntity));
            return todosLoadedSuccessfully({ completedIds, todos: todoEntities });
          })
        )
      )
    ), { dispatch: true });

  loadFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterActions.loadFilter),
      map(() => localStorage.getItem('filter')),
      filter(f => f !== null),
      map(f => f as FilterOptions),
      map(f => filterActions.setFilter({ filter: f }))
    )
  );

  saveFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(filterActions.setFilter),
      tap(a => localStorage.setItem('filter', a.filter))
    );
  }, { dispatch: false });

  constructor(private actions$: Actions, private client: HttpClient) { }
}

interface TodosResponse {
  data: { id: string, description: string, completed: boolean }[];
}
