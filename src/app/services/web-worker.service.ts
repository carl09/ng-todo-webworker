import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IWorkerMessage, WorkerActions } from '../models';

@Injectable()
export class WebWorkerService {
  public listnerSubject: BehaviorSubject<IWorkerMessage>;

  private worker: Worker;

  constructor() {
    this.listnerSubject = new BehaviorSubject<IWorkerMessage>(undefined);
  }

  public start(script: string): void {
    this.worker = new Worker(script);

    this.worker.addEventListener('message', message => {
      this.listnerSubject.next(message.data);
    });
  }

  public listen(): Observable<IWorkerMessage> {
    return this.listnerSubject.asObservable();
  }

  public send(message: WorkerActions) {
    if (this.worker) {
      this.worker.postMessage(message);
    }
  }

  public stop() {
    this.worker.terminate();
    this.worker = undefined;
  }
}
