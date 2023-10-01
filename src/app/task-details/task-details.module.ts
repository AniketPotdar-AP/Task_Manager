import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetailsRoutingModule } from './task-details-routing.module';
import { TaskDetailsComponent } from './task-details.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskDetailsComponent],
  imports: [CommonModule, TaskDetailsRoutingModule, AngularMaterialModule,ReactiveFormsModule],
})
export class TaskDetailsModule { }
