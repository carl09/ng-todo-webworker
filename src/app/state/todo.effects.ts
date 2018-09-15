import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { START, StartAction, TodoLoadAction, TodoModel } from './todo.models';

@Injectable()
export class InitEffects {
  @Effect()
  start$: Observable<Action> = this.actions$.pipe(
    ofType<StartAction>(START),
    mergeMap(() =>
      this.http.get<TodoModel[]>('/assets/todos.json').pipe(
        map(data => {
          console.log(data);
          return new TodoLoadAction(data);
        }),
      ),
    ),
  );

  constructor(private http: HttpClient, private actions$: Actions) {}
}
