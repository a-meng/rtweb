import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { RoleComponent } from './role/role.component';
const routes: Routes = [
    {
        path: '',
        component: ListPageComponent
    }, {
        path: 'create',
        data: ['admin/user/edit'],
        component: EditPageComponent
    }, {
        path: ':id/edit',
        data: ['admin/user/edit'],
        component: EditPageComponent
    }, {
        path: ':id/role',
        data: ['admin/user/edit'],
        component: RoleComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
