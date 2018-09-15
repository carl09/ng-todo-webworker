import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ClientProxyService } from './services/client-proxy.service';
import { TodoBackgroundService } from './services/todo-background.service';
import { TodoService } from './services/todo-base.service';
import { TodoClientService } from './services/todo-client.service';
import { WebWorkerService } from './services/web-worker.service';
import { reducers } from './state/reducers';
import { InitEffects } from './state/todo.effects';

// tslint:disable:max-classes-per-file

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
})
export class BaseModule {}


@NgModule({
  imports: [BaseModule],
  providers: [
    WebWorkerService,
    ClientProxyService,
    { provide: Store, useExisting: ClientProxyService },
    { provide: TodoService, useClass: TodoClientService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(webWorkerService: WebWorkerService) {
    webWorkerService.start('assets/main.js');
  }
}

@NgModule({
  imports: [
    BaseModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([InitEffects]),
  ],
  providers: [{ provide: TodoService, useClass: TodoBackgroundService }],
  bootstrap: [AppComponent],
})
export class InLineModule {}
