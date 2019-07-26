import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListItemModel } from '../../models';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodosState, selectTodosList, selectCurrentFilter } from '../../reducers';
import { TodoEntity } from '../../reducers/list.reducer';
import { todoItemCompleted, clearCompleted } from '../../actions/list.actions';
import { FilterOptions } from '../../reducers/filter.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(private store: Store<TodosState>) { }

  model$: Observable<ListItemModel[]>;
  subscription: Subscription;
  completedItems: ListItemModel[];
  currentFilter$: Observable<FilterOptions>;

  ngOnInit() {
    this.model$ = this.store.select(selectTodosList);
    this.subscription = this.model$.subscribe(items =>
      this.completedItems = items.filter(item => item.completed));
    this.currentFilter$ = this.store.select(selectCurrentFilter);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  markComplete(item: TodoEntity) {
    this.store.dispatch(todoItemCompleted({ item }));
  }

  removeCompleted() {
    this.store.dispatch(clearCompleted({ items: this.completedItems }));
  }
}

