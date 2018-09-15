import { InjectionToken } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

// tslint:disable:max-classes-per-file

export interface IWorkerMessage {
  reducer: string;
  payload: any;
}

const createActionUnsubscribeKey = (workerActions: WorkerActions) => {
    switch (workerActions.action) {
      case 'execute': {
        const d = workerActions as ExecuteWorkerAction;
        return `${d.key}-${d.uniqueRef}`;
      }
      default:
        return '';
    }
  };

export class SubScriptionManager {
  public key: string;
  public subscription: Subscription;

  constructor(workerAction: WorkerActions) {
    this.key = createActionUnsubscribeKey(workerAction);
  }
}

export interface IWorkerAction {
  action: ActionType;
}

export class ReducerWorkerAction implements IWorkerAction {
  public action: ActionType = 'reducer';
  public payload: any;
}

export class ExecuteWorkerAction implements IWorkerAction {
  public action: ActionType = 'execute';
  public key: string;
  public uniqueRef: string;
  public args: any[];
  constructor(key: string, uniqueRef: string, args: any[]) {
    this.key = key;
    this.uniqueRef = uniqueRef;
    this.args = args;
  }
}

export class UnsubscribeWorkerAction implements IWorkerAction {
  public action: ActionType = 'unsubscribe';
  public key: string;
  constructor(workerActions: WorkerActions) {
    this.key = createActionUnsubscribeKey(workerActions);
  }
}

export declare type ActionType = 'reducer' | 'execute' | 'unsubscribe';

export declare type WorkerActions =
  | ReducerWorkerAction
  | ExecuteWorkerAction
  | UnsubscribeWorkerAction;

export const SERVICE_WITH_INDEX = new InjectionToken<IServiceWithIndex[]>(
  'SERVICE_WITH_INDEX',
);

export interface IServiceWithIndex {
  methods: { [id: string]: (args: any[]) => Observable<any> };
}
