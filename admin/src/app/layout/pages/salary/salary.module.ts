import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SalaryRoutingModule} from './salary-routing.module';
import {SalaryComponent} from './salary.component';
import {ReactiveFormsModule} from '@angular/forms';
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


@NgModule({
  declarations: [SalaryComponent],
  imports: [
    CommonModule,
    SalaryRoutingModule,
    ReactiveFormsModule,
    NzFormModule,
    NzModalModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzInputModule,
    NzDividerModule,
    NzPopconfirmModule
  ]
})
export class SalaryModule { }
