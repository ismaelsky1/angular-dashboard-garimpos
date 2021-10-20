import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user.component';
import {UserRoutingModule} from './user-routing.module';
import {NzButtonModule, NzGridModule, NzIconModule, NzInputModule, NzSelectModule, NzTableModule, NzTagModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule
  ]
})
export class UserModule { }
