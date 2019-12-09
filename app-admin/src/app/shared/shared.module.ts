import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAsideMenuComponent } from './app-aside-menu/app-aside-menu.component';
import { RouterModule } from '@angular/router';
import { TreeComponent } from './tree/tree.component';
import { MessageComponent } from './message/message.component';

@NgModule({
    declarations: [AppAsideMenuComponent, TreeComponent, MessageComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [AppAsideMenuComponent, TreeComponent, MessageComponent]
})
export class SharedModule { }
