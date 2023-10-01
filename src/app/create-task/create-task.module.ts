import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTaskRoutingModule } from './create-task-routing.module';
import { CreateTaskComponent } from './create-task.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateTaskComponent],
  imports: [
    CommonModule,
    CreateTaskRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class CreateTaskModule { }
