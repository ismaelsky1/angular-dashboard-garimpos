import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompanyComponent} from './company.component';
import {CompanyRoutingModule} from './company-routing.module';
import {
  NzButtonModule, NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule, NzLayoutModule,
  NzModalModule,
  NzSelectModule,
  NzTableModule,
  NzTagModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzSelectModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzLayoutModule
  ]
})
export class CompanyModule { }
