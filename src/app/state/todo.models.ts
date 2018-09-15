import { Action } from "@ngrx/store";
// tslint:disable:max-classes-per-file

export const ADD = '[Todo] Add';
export const LOAD = '[Todo] Load';
export const START = '[Todo] Start';
export const RESET = 'Reset';

export interface TodoModel {
    name: string;
  }

export class TodoAddAction implements Action {
  readonly type = ADD;
  constructor(readonly payload: TodoModel) {}
}

export class TodoLoadAction implements Action {
  readonly type = LOAD;
  constructor(readonly payload: TodoModel[]) {}
}


export class StartAction implements Action {
    readonly type = START;
  }

export class ResetAction implements Action {
  readonly type = RESET;
}

export type TodoActions = TodoAddAction | TodoLoadAction | ResetAction ;