import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {SingleLayoutComponent} from './single-layout/single-layout.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {NgZorroAntdModule, NZ_I18N, pt_BR} from 'ng-zorro-antd';
import {BrowserModule} from '@angular/platform-browser';
import {IconsProviderModule} from '../icons-provider.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from '../helpers/jwt.interceptor';
import {ErrorInterceptor} from '../helpers/error.interceptor';
import pt from '@angular/common/locales/pt';
registerLocaleData(pt);

@NgModule({
  declarations: [
    MainLayoutComponent,
    SingleLayoutComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        IconsProviderModule,
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LayoutRoutingModule,
        ReactiveFormsModule
    ],
  providers: [
    {provide: NZ_I18N, useValue: pt_BR},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
})
export class LayoutModule { }
