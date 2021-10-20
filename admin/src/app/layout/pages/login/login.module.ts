import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {
    NzAlertModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzLayoutModule,
    NzRadioModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        NzButtonModule,
        NzInputModule,
        NzFormModule,
        NzCardModule,
        ReactiveFormsModule,
        NzGridModule,
        NzLayoutModule,
        NzAlertModule,
        NzRadioModule
    ]
})
export class LoginModule { }
