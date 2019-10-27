import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ListPageComponent } from './list-page/list-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { PermsComponent } from './perms/perms.component';
const routes: Routes = [
    {
        path: '',
        component: ListPageComponent
    }, {
        path: 'create',
        component: EditPageComponent
    }, {
        path: ':id/edit',
        component: EditPageComponent
    }, {
        path: ':id/perms',
        component: PermsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolesRoutingModule { }
