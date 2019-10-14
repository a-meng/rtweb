import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { PermsComponent } from './perms/perms.component';


@NgModule({
    declarations: [ListPageComponent, EditPageComponent, PermsComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RolesRoutingModule
    ]
})
export class RolesModule { }
