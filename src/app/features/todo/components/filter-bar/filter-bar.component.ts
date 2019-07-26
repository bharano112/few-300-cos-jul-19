import { Component, OnInit } from '@angular/core';
import { TodosState, selectCurrentFilter } from '../../reducers';
import { Store } from '@ngrx/store';
import { FilterOptions } from '../../reducers/filter.reducer';
import { setFilter, setFilterBy } from '../../actions/filter.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  constructor(private store: Store<TodosState>) { }

  currentFilter$: Observable<FilterOptions>;

  search: string;

  ngOnInit() {
    this.currentFilter$ = this.store.select(selectCurrentFilter);
  }

  searchList(filterText: string) {
    this.store.dispatch(setFilterBy({ filterText }));
  }

  setFilter(filter: FilterOptions) {
    this.store.dispatch(setFilter({ filter }));
  }

}
