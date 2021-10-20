import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkHourComponent} from './work-hour.component';
import {WorkHourRoutingModule} from './work-hour-routing.module';
import {
  NzButtonModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzModalModule, NzPopconfirmModule,
  NzTableModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [WorkHourComponent],
  imports: [
    CommonModule,
    WorkHourRoutingModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzDividerModule,
    NzPopconfirmModule
  ]
})
export class WorkHourModule { }
