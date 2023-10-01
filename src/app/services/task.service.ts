import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environment/environment.prod';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  /*=======================================================
                       Create Task
  =======================================================*/

  createTask(title: string, description: string, due_Date: string) {
    const taskData: Task = {
      title: title,
      description: description,
      due_Date: due_Date,
    };
    this.http.post(`${environment.apiUrl}/createTask`, taskData).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        this.authStatusListener.next(false);
        console.log(error);
      },
    });
  }

  /*=======================================================
                       Get All Task
  =======================================================*/

  getTasks() {
    return this.http.get(`${environment.apiUrl}/getTasks`);
  }

  /*=======================================================
                        Get Task By ID
  =======================================================*/

  getTaskById(id: any) {
    return this.http.get(`${environment.apiUrl}/getTask/${id}`);
  }

  /*=======================================================
                        Update Task
  =======================================================*/

  updateTasks(id: any, title: string, description: string, due_Date: string) {
    const task: Task = {
      title: title,
      description: description,
      due_Date: due_Date,
    };
    return this.http
      .put(`${environment.apiUrl}/updateTask/${id}`, task)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
        error: (error) => {
          console.log(error.error.error);
        },
      });
  }

  /*=======================================================
                        Delete Task
  =======================================================*/

  deleteTask(id: any) {
    this.router.navigateByUrl('/home');
    return this.http.delete(`${environment.apiUrl}/deleteTask/${id}`);
  }
}
