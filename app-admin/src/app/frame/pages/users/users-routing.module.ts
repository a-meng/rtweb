import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { RoleComponent } from './role/role.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
const routes: Routes = [
    {
        path: '',
        component: ListPageComponent
    }, {
        path: 'create',
        data: { auth: ['/admin/user/edit'] },
        canActivate: [AuthGuard],
        component: EditPageComponent
    }, {
        path: ':id/edit',
        data: { auth: ['/admin/user/edit'] },
        canActivate: [AuthGuard],
        component: EditPageComponent
    }, {
        path: ':id/role',
        data: { auth: ['/admin/user/edit'] },
        canActivate: [AuthGuard],
        component: RoleComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
