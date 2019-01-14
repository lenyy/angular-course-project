import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {AuthRoutingModule} from './auth/auth-routing.module';
import {CoreModule} from './core/core.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        SharedModule,
        AuthModule,
        AuthRoutingModule,
        CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
