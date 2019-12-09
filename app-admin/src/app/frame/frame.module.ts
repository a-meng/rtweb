import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameRoutingModule } from './frame-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FrameComponent } from './frame/frame.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { Page404Component } from './pages/page404/page404.component';

@NgModule({
    declarations: [FrameComponent, WelcomeComponent, Page404Component],
    imports: [
        CommonModule,
        SharedModule,
        FrameRoutingModule
    ]
})
export class FrameModule {}
