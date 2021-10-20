import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CboRoutingModule} from './cbo-routing.module';
import {CboComponent} from './cbo.component';
import {
    NzButtonModule,
    NzDividerModule, NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule, NzModalModule, NzPopconfirmModule,
    NzSelectModule,
    NzTableModule,
    NzTagModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CboComponent],
    imports: [
        CommonModule,
        CboRoutingModule,
        NzGridModule,
        FormsModule,
        NzSelectModule,
        NzButtonModule,
        NzIconModule,
        NzTableModule,
        NzTagModule,
        NzDividerModule,
        NzInputModule,
        NzModalModule,
        ReactiveFormsModule,
        NzFormModule,
        NzPopconfirmModule
    ]
})
export class CboModule { }
