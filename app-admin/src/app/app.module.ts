import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// 主要功能模块
import { UsersModule } from './pages/users/users.module';
import { RolesModule } from './pages/roles/roles.module';
import { PermissionsModule } from './pages/permissions/permissions.module';

import { SharedModule } from './shared/shared.module';
import { Page404Component } from './page404/page404.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GraphQLModule } from './graphql.module';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        Page404Component,
        WelcomeComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        SharedModule,

        UsersModule,
        RolesModule,
        PermissionsModule,

        AppRoutingModule,

        GraphQLModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
