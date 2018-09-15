import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../state/reducers';
import { TodoModel } from '../state/todo.models';
import { TodoService } from './todo-base.service';

@Injectable()
export class TodoBackgroundService extends TodoService {
  constructor(store: Store<AppState>) {
    super(store);
  }

  public getTodoItems(): Observable<TodoModel[]> {
    return this.store.pipe(select(x => x.todo));
  }
}
