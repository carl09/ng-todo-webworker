import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoService } from './services/todo-base.service';
import { StartAction, TodoAddAction, TodoModel } from './state/todo.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public todoForm: FormGroup;

  public items$: Observable<TodoModel[]>;

  constructor(private todoService: TodoService) {
    this.todoForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });

    todoService.dispatch(new StartAction());

    this.items$ = todoService.getTodoItems();
  }

  onSubmit() {
    this.todoService.dispatch(
      new TodoAddAction({ name: this.todoForm.value.name }),
    );
    this.todoForm.reset();
  }
}
