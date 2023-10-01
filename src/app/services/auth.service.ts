import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environment/environment.prod';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  token: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public getToken() {
    this.token = JSON.parse(sessionStorage.getItem('token')!);
    return this.token;
  }

  /*=======================================================
                     Login User
  =======================================================*/

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }

  /*=======================================================
                     Logout User
  =======================================================*/

  logout() {
    // remove user from local session to log user out
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    this.userSubject.next(null!);
    this.router.navigate(['/']);
  }
}
