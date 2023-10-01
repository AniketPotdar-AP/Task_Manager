import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  task: any;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.taskService.getTasks().subscribe((response) => {
      this.task = response;
    });
  }

  logout() {
    this.authService.logout();
  }
}
