import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrameComponent } from './frame/frame.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { Page404Component } from './pages/page404/page404.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
const routes: Routes = [
    {
        path: '',
        component: FrameComponent,
        children: [
            { path: '', component: WelcomeComponent },
            {
                path: 'permissions',
                data: ['/admin/permission'],
                canLoad: [AuthGuard],
                loadChildren: () => import('./pages/permissions/permissions.module').then(mod => mod.PermissionsModule)
            },
            {
                path: 'users',
                data: ['/admin/user'],
                loadChildren: () => import('./pages/users/users.module').then(mod => mod.UsersModule)
            }, {
                path: 'roles',
                data: ['/admin/role'],
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
