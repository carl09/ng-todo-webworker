import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SERVICE_WITH_INDEX } from './models';
import { BackGroundWorkerService } from './services/background-worker.service';
import { TodoBackgroundService } from './services/todo-background.service';
import { reducers } from './state/reducers';
import { InitEffects } from './state/todo.effects';
// import { ServerModule } from '@angular/platform-server';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.disable(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([InitEffects]),
  ],
  providers: [
    BackGroundWorkerService,
    {
      provide: SERVICE_WITH_INDEX,
      useClass: TodoBackgroundService,
      multi: true,
    },
  ],
  bootstrap: [],
})
export class WebWorkerModule {
  constructor(backGroundWorkerService: BackGroundWorkerService) {
    backGroundWorkerService.start();
  }
  ngDoBootstrap() {}
}
