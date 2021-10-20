import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationInviteComponent} from './registration-invite.component';
import {RegistrationInviteRoutingModule} from './registration-invite-routing.module';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule, NzCheckboxModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule, NzIconModule,
  NzInputModule,
  NzInputNumberModule, NzLayoutModule,
  NzRadioModule,
  NzSelectModule, NzSliderModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RegistrationInviteComponent
  ],
  imports: [
    CommonModule,
    RegistrationInviteRoutingModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    NzSelectModule,
    NzInputNumberModule,
    NzDividerModule,
    NzCardModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSliderModule,
    NzIconModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzAlertModule
  ]
})
export class RegistrationInviteModule { }
