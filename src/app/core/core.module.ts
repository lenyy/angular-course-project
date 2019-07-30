import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {AuthGuard} from '../auth/auth.guard.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../shared/auth.interceptor';
import {LoggingInterceptor} from '../shared/logging.interceptor';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [
        AuthGuard,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    ]
})
export class CoreModule {

}
