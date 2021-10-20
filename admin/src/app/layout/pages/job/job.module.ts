import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JobComponent} from './job.component';
import {JobRoutingModule} from './job-routing.module';
import {
    NzButtonModule,
    NzDividerModule, NzFormModule,
    NzGridModule,
    NzIconModule, NzInputModule, NzModalModule, NzPopconfirmModule,
    NzSelectModule,
    NzSwitchModule,
    NzTableModule, NzTagModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    JobComponent
  ],
    imports: [
        CommonModule,
        JobRoutingModule,
        NzGridModule,
        NzSelectModule,
        FormsModule,
        NzButtonModule,
        NzIconModule,
        NzTableModule,
        NzSwitchModule,
        NzDividerModule,
        NzPopconfirmModule,
        NzModalModule,
        ReactiveFormsModule,
        NzFormModule,
        NzTagModule,
        NzInputModule
    ]
})
export class JobModule { }
