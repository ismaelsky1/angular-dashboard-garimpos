import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RewardComponent} from './reward.component';
import {RewardRoutingModule} from './reward-routing.module';
import {
  NzButtonModule, NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzModalModule, NzPopconfirmModule,
  NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [RewardComponent],
  imports: [
    CommonModule,
    RewardRoutingModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzTableModule,
    NzIconModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzDividerModule
  ]
})
export class RewardModule { }
