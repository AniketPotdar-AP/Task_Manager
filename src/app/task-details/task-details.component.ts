import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  taskForm: FormGroup;
  data: any;
  id: any;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.taskForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      due_Date: new FormControl('', [Validators.required]),
    });
  }

  /*=======================================================
                   Get Task Data by ID
  =======================================================*/

  getTaskById() {
    this.taskService.getTaskById(this.id).subscribe((data) => {
      this.data = data;
      this.taskForm.patchValue({
        title: this.data?.title,
        description: this.data?.description,
        due_Date: this.data?.due_Date,
      });
    });
  }

  /*=======================================================
                     Update Task
  =======================================================*/

  updateTask() {
    this.taskService.updateTasks(
      this.id,
      this.taskForm.value.title,
      this.taskForm.value.description,
      this.taskForm.value.due_Date
    );
  }

  /*=======================================================
                     Delete Task
  =======================================================*/

  deleteTask() {
    this.taskService.deleteTask(this.id).subscribe(() => { });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getTaskById();
  }

  logout() {
    this.authService.logout();
  }

  get f() {
    return this.taskForm.controls;
  }

}
