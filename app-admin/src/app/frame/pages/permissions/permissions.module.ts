import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditPageComponent } from './edit-page/edit-page.component';



@NgModule({
    declarations: [ListPageComponent, EditPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PermissionsRoutingModule
    ]
})
export class PermissionsModule { }
