import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  /*=======================================================
                     Create Task
  =======================================================*/

  createTask() {
    if (this.taskForm.invalid) {
      return;
    }

    const { title, description, dueDate } = this.taskForm.value;

    this.taskService.createTask(title, description, dueDate).subscribe(() => {
      this.router.navigateByUrl('/home');
      this.taskForm.reset();
      this.taskForm.markAsPristine();
      this.taskForm.markAsUntouched();
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  logout() {
    this.authService.logout();
  }
}
