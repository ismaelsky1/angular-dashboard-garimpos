import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {
  NzButtonModule,
  NzCardModule,
  NzDatePickerModule,
  NzGridModule,
  NzIconModule,
  NzSelectModule,
  NzSkeletonModule, NzTableModule, NzTagModule
} from 'ng-zorro-antd';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzSelectModule,
    NzGridModule,
    NzDatePickerModule,
    NzCardModule,
    NzSkeletonModule,
    NzIconModule,
    NzButtonModule,
    NzTableModule,
    NzTagModule
  ]
})
export class DashboardModule { }
