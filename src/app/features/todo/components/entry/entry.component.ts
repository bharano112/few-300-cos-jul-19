import { Component, OnInit } from '@angular/core';
import { TodoEntity } from '../../reducers/list.reducer';
import { Store } from '@ngrx/store';
import { addTodoItem } from '../../actions/list.actions';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor(private store: Store<TodoEntity>) { }

  ngOnInit() {
  }

  add(description: HTMLInputElement) {
    const desc = description.value;
    this.store.dispatch(addTodoItem(desc));
    description.value = '';
    description.focus();
  }

}
