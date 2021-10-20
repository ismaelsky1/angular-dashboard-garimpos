import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from './registration.component';
import {RegistrationRoutingModule} from './registration-routing.module';
import {
    NzAlertModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzLayoutModule,
    NzRadioModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        NzAlertModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        ReactiveFormsModule,
        NzLayoutModule,
        NzGridModule,
        NzCheckboxModule,
        NzRadioModule
    ]
})
export class RegistrationModule { }
