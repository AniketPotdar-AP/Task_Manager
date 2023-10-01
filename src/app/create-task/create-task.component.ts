import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  taskForm!: FormGroup;
  salaryService: any;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.taskForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      due_Date: new FormControl('', [Validators.required]),
    });
  }

  /*=======================================================
                     Create Task
  =======================================================*/

  createTask(taskForm: FormGroup) {
    if (taskForm.invalid) {
      return;
    }
    this.taskService.createTask(
      taskForm.value.title,
      taskForm.value.description,
      this.taskForm.value.due_Date
    );

    if (this.taskService.createTask!) {
      taskForm.reset();
      Object.keys(taskForm.controls).forEach((key) => {
        taskForm.controls[key].setErrors(null);
      });
    }
  }

  get f() {
    return this.taskForm.controls;
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void { }
}
