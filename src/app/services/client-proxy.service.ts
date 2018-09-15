import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ExecuteWorkerAction,
  UnsubscribeWorkerAction,
  WorkerActions,
} from '../models';
import { WebWorkerService } from './web-worker.service';

@Injectable()
export class ClientProxyService {
  private subs: { [id: string]: BehaviorSubject<any> } = {};

  constructor(private webWorkerService: WebWorkerService) {
    this.webWorkerService.listen().subscribe(x => {
      if (x !== undefined && this.subs[x.reducer] !== undefined) {
        this.subs[x.reducer].next(x.payload);
      }
    });
  }

  public dispatch<V extends Action = Action>(action: V): void {
    this.webWorkerService.send({
      action: 'reducer',
      payload: action,
    });
  }

  public execute<T>(
    method: string,
    uniqueRef: string,
    ...args: any[]
  ): Observable<T> {
    const action = new ExecuteWorkerAction(method, uniqueRef, args);
    const unsub = new UnsubscribeWorkerAction(action);

    return this.createInnerSub(action, unsub);
  }

  private createInnerSub<T>(
    action: WorkerActions,
    unSub: UnsubscribeWorkerAction,
  ): Observable<T> {
    if (this.subs[unSub.key] === undefined) {
      this.subs[unSub.key] = new BehaviorSubject<T>(undefined);

      this.webWorkerService.send(action);

      this.subs[unSub.key].subscribe(() => {}, null, () => {
        this.webWorkerService.send(unSub);
      });
    }

    return this.subs[unSub.key].asObservable();
  }
}
