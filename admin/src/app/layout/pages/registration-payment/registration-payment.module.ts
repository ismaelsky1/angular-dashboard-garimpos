import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationPaymentComponent} from './registration-payment.component';
import {RegistrationPaymentRoutingModule} from './registration-payment-routing.module';
import {
  NzButtonModule,
  NzCardModule, NzCheckboxModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule, NzIconModule,
  NzInputModule,
  NzInputNumberModule,
  NzRadioModule,
  NzSelectModule, NzSliderModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RegistrationPaymentComponent
  ],
  imports: [
    CommonModule,
    RegistrationPaymentRoutingModule,
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
    ReactiveFormsModule
  ]
})
export class RegistrationPaymentModule { }
