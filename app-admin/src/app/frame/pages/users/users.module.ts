import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { RoleComponent } from './role/role.component';


@NgModule({
    declarations: [ListPageComponent, EditPageComponent, RoleComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule,
        UsersRoutingModule
    ]
})
export class UsersModule { }
