import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrameComponent } from './frame/frame.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { Page404Component } from './pages/page404/page404.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
const routes: Routes = [
    {
        path: '',
        data: { auth: ['/admin'] },
        component: FrameComponent,
        canActivateChild: [AuthGuard],
        children: [
            { path: '', component: WelcomeComponent },
            {
                path: 'permissions',
                data: { auth: ['/admin/permission'] },
                canLoad: [AuthGuard],
                loadChildren: () => import('./pages/permissions/permissions.module').then(mod => mod.PermissionsModule)
            },
            {
                path: 'users',
                data: { auth: ['/admin/user'] },
                canLoad: [AuthGuard],
                loadChildren: () => import('./pages/users/users.module').then(mod => mod.UsersModule)
            }, {
                path: 'roles',
                data: { auth: ['/admin/role'] },
                canLoad: [AuthGuard],
                loadChildren: () => import('./pages/roles/roles.module').then(mod => mod.RolesModule)
            },
            { path: '**', component: Page404Component }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrameRoutingModule { }
