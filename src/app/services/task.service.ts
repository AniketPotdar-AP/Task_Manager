import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  /*=======================================================
                     Create Task
  =======================================================*/

  createTask(title: string, description: string, dueDate: string): Observable<void> {
    const taskData: Task = {
      title,
      description,
      dueDate,
    };
    return this.http
      .post<void>(`${environment.apiUrl}/createTask`, taskData)
      .pipe(
        catchError((error) => {
          this.authStatusListener.next(false);
          console.error(error.error.error);
          throw error;
        })
      );
  }

  /*=======================================================
                     Get All Task
  =======================================================*/

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/getTasks`);
  }

  /*=======================================================
                      Get Task By ID
  =======================================================*/

  getTaskById(id: any): Observable<Task> {
    return this.http.get<Task>(`${environment.apiUrl}/getTask/${id}`);
  }

  /*=======================================================
                      Update Task
  =======================================================*/

  updateTasks(id: any, title: string, description: string, dueDate: string) {
    const task: Task = {
      title: title,
      description: description,
      dueDate: dueDate,
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

  deleteTask(id: any): Observable<void> {
    this.router.navigateByUrl('/home');
    return this.http
      .delete<void>(`${environment.apiUrl}/deleteTask/${id}`)
      .pipe(
        catchError((error) => {
          console.error(error.error.error);
          throw error;
        })
      );
  }
}
