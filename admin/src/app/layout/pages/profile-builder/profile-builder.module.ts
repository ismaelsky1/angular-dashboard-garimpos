import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileBuilderComponent} from './profile-builder.component';
import {ProfileBuilderRoutingModule} from './profile-builder-routing.module';
import {
  NzButtonModule, NzDividerModule,
  NzFormModule,
  NzGridModule, NzIconModule, NzInputModule,
  NzModalModule, NzPopconfirmModule,
  NzSelectModule,
  NzSwitchModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ProfileBuilderComponent
  ],
  imports: [
    CommonModule,
    ProfileBuilderRoutingModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzGridModule,
    NzButtonModule,
    NzSwitchModule,
    FormsModule,
    NzTableModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule
  ]
})
export class ProfileBuilderModule { }
