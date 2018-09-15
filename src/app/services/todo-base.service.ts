import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IServiceWithIndex } from '../models';
import { AppState } from '../state/reducers';
import { TodoModel } from '../state/todo.models';

export abstract class TodoService implements IServiceWithIndex {
  public methods: { [id: string]: (args: any[]) => Observable<any> } = {};

  protected readonly methodGetTodoItems = 'TodoBaseService.getTodoItems';

  constructor(protected store: Store<AppState>) {
    this.methods[this.methodGetTodoItems] = (_args: any[]) =>
      this.getTodoItems();
  }

  public abstract getTodoItems(): Observable<TodoModel[]>;

  public dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
