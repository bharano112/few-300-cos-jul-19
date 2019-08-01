import { Component, OnInit } from '@angular/core';
import { PersonEntity } from '../../reducers/people.reducer';
import { Store } from '@ngrx/store';
import { addPerson } from '../../actions/people.actions';
import { Observable } from 'rxjs';
import { selectAllPeople } from '../../reducers';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  people$: Observable<PersonEntity[]>;

  constructor(private store: Store<PersonEntity>) { }

  ngOnInit() {
    this.people$ = this.store.select(selectAllPeople);
  }

  add(name: HTMLInputElement) {
    const tmpName = name.value;
    this.store.dispatch(addPerson(tmpName));
    name.value = '';
    name.focus();
  }

}
