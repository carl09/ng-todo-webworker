import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ExecuteWorkerAction,
  IServiceWithIndex,
  IWorkerMessage,
  ReducerWorkerAction,
  SERVICE_WITH_INDEX,
  SubScriptionManager,
  UnsubscribeWorkerAction,
  WorkerActions,
} from '../models';
import { AppState } from '../state/reducers';

declare const postMessage: (v: any) => {};

@Injectable()
export class BackGroundWorkerService {
  private worker: Worker;
  private subs: SubScriptionManager[] = [];

  private isSharedWorker = false;

  constructor(
    private store: Store<AppState>,
    @Inject(SERVICE_WITH_INDEX) private serviceWithIndex: IServiceWithIndex[],
  ) {}

  public start() {
    console.log('start web worker');

    if (typeof onmessage !== 'undefined' && typeof onmessage !== undefined) {
      onmessage = e => {
        if (e.data) {
          const data: WorkerActions = e.data;
          this.processMessage(data);
        }
      };
    } else {
      console.warn('Not a web Worker');
    }
  }

  public send(message: IWorkerMessage) {
    console.log('Sending Message to Client:', message);
    postMessage(message);
  }

  public stop() {
    this.worker.terminate();
    this.worker = undefined;
  }

  private processMessage(data: WorkerActions) {
    console.log('Received Message from Client:', data);
    let subScriptionManager: SubScriptionManager;

    switch (data.action) {
      case 'reducer': {
        const d = data as ReducerWorkerAction;
        this.store.dispatch(d.payload);
        break;
      }
      case 'execute': {
        const d = data as ExecuteWorkerAction;
        subScriptionManager = new SubScriptionManager(d);

        this.serviceWithIndex.forEach(s => {
          if (s.methods[d.key]) {
            subScriptionManager.subscription = s.methods[d.key](
              d.args,
            ).subscribe(x => {
              this.send({
                reducer: subScriptionManager.key,
                payload: x,
              });
            });
          }
        });
        break;
      }
      case 'unsubscribe': {
        if (!this.isSharedWorker) {
          const d = data as UnsubscribeWorkerAction;
          let i = this.subs.length;
          while (i--) {
            if (this.subs[i].key === d.key) {
              this.subs[i].subscription.unsubscribe();
              this.subs.splice(i, 1);
            }
          }
        }
      }
    }

    if (subScriptionManager) {
      this.subs.push(subScriptionManager);
    }
  }
}
