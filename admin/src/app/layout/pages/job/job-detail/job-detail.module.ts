import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailComponent } from './job-detail.component';
import {JobDetailRoutingModule} from './job-detail-routing.module';
import {
  NzAvatarModule,
  NzButtonModule, NzCardModule,
  NzDividerModule, NzDropDownModule, NzFormModule,
  NzGridModule, NzIconModule, NzListModule, NzModalModule, NzPopconfirmModule, NzSelectModule, NzSkeletonModule,
  NzSwitchModule,
  NzTableModule, NzTabsModule,
  NzTagModule,
  NzTypographyModule
} from 'ng-zorro-antd';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [JobDetailComponent],
  imports: [
    CommonModule,
    JobDetailRoutingModule,
    NzTypographyModule,
    NzTagModule,
    NzGridModule,
    NzTableModule,
    NzSwitchModule,
    NzDividerModule,
    NzPopconfirmModule,
    FormsModule,
    NzListModule,
    NzSkeletonModule,
    NzIconModule,
    NzButtonModule,
    NzFormModule,
    NzCardModule,
    NzSelectModule,
    NzModalModule,
    NzDropDownModule,
    NzTabsModule,
    NzAvatarModule
  ]
})
export class JobDetailModule { }
