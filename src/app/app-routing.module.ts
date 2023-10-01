import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'create-task',
    loadChildren: () => import('./create-task/create-task.module').then((m) => m.CreateTaskModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'task-details/:id',
    loadChildren: () => import('./task-details/task-details.module').then((m) => m.TaskDetailsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
