import { ADD, LOAD, RESET, TodoActions, TodoModel } from './todo.models';

export function todoReducer(
  state: TodoModel[] = [],
  action: TodoActions,
): TodoModel[] {
  console.log(action.type);

  switch (action.type) {
    case ADD:
      return [...state, action.payload];
    case LOAD:
      return [...state, ...action.payload];
    case RESET:
      return [];
    default:
      return state;
  }
}
