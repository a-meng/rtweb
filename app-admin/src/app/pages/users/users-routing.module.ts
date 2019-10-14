import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
const routes: Routes = [
    {
        path: 'users',
        data: { perm: 'admin' },
        canActivate: [AuthGuard],
        children: [{
            path: '',
            data: { perm: 'admin/user' },
            canActivate: [AuthGuard],
            component: ListPageComponent
        }, {
            path: 'create',
            data: { perm: 'admin/user/edit' },
            canActivate: [AuthGuard],
            component: EditPageComponent
        }, {
            path: ':id/edit',
            data: { perm: 'admin/user/edit' },
            canActivate: [AuthGuard],
            component: EditPageComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
