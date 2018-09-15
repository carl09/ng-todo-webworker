import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../state/reducers';
import { TodoModel } from '../state/todo.models';
import { ClientProxyService } from './client-proxy.service';
import { TodoService } from './todo-base.service';

@Injectable()
export class TodoClientService extends TodoService {
  constructor(
    private clientProxyService: ClientProxyService,
    store: Store<AppState>,
  ) {
    super(store);
  }

  public getTodoItems(): Observable<TodoModel[]> {
    return this.clientProxyService.execute<TodoModel[]>(
      this.methodGetTodoItems,
      '',
    );
  }
}
