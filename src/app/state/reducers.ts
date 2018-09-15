import { ActionReducerMap } from '@ngrx/store';
import { TodoModel } from './todo.models';
import { todoReducer } from './todo.reducer';

export interface AppState {
  todo: TodoModel[];
}

export const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer,
};
