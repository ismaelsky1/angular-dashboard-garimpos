import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsultantRoutingModule} from './consultant-routing.module';
import {ConsultantComponent} from './consultant.component';
import {NzButtonModule, NzGridModule, NzIconModule, NzInputModule, NzSelectModule, NzTableModule, NzTagModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [ConsultantComponent],
  imports: [
    CommonModule,
    ConsultantRoutingModule,
    NzGridModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzInputModule
  ]
})
export class ConsultantModule { }
