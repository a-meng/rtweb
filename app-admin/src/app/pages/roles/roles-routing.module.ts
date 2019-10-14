import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ListPageComponent } from './list-page/list-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { PermsComponent } from './perms/perms.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
const routes: Routes = [
    {
        path: 'roles',
        children: [{
            path: '',
            data: { perm: 'admin/role' },
            canActivate: [AuthGuard],
            component: ListPageComponent
        }, {
            path: 'create',
            data: { perm: 'admin/role/edit' },
            canActivate: [AuthGuard],
            component: EditPageComponent
        }, {
            path: ':id/edit',
            data: { perm: 'admin/role/edit' },
            canActivate: [AuthGuard],
            component: EditPageComponent
        }, {
            path: ':id/perms',
            component: PermsComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolesRoutingModule { }
