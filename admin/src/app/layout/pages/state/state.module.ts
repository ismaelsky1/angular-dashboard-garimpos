import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateRoutingModule } from './state-routing.module';
import {StateComponent} from './state.component';
import {
  NzButtonModule,
  NzDividerModule, NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzModalModule,
  NzPopconfirmModule, NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [StateComponent],
  imports: [
    CommonModule,
    StateRoutingModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule
  ]
})
export class StateModule { }
