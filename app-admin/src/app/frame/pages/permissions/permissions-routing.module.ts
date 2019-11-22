import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
const routes: Routes = [{
        path: '',
        component: ListPageComponent,
    }, {
        path: ':id/edit',
        data: { auth: ['/admin/permission/edit'] },
        canActivate: [AuthGuard],
        component: EditPageComponent
    }, {
        path: 'create',
        data: { auth: ['/admin/permission/edit'] },
        canActivate: [AuthGuard],
        component: EditPageComponent
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PermissionsRoutingModule { }
