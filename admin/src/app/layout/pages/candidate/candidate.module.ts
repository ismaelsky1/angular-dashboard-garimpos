import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CandidateComponent} from './candidate.component';
import {CandidateRoutingModule} from './candidate-routing.module';
import {NzButtonModule, NzGridModule, NzIconModule, NzInputModule, NzSelectModule, NzTableModule, NzTagModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [CandidateComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule
  ]
})
export class CandidateModule { }
