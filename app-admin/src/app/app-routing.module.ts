import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        data: ['/admin'],
        canLoad: [AuthGuard],
        loadChildren: () => import('./frame/frame.module').then(mod => mod.FrameModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
