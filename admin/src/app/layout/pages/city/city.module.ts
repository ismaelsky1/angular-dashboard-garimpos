import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityRoutingModule } from './city-routing.module';
import {CityComponent} from './city.component';
import {
  NzButtonModule,
  NzDividerModule, NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule, NzLayoutModule,
  NzModalModule,
  NzPopconfirmModule, NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CityComponent],
  imports: [
    CommonModule,
    CityRoutingModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzLayoutModule
  ]
})
export class CityModule { }
