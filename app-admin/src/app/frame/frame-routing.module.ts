import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrameComponent } from './frame/frame.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { Page404Component } from './pages/page404/page404.component';
import { AuthGuard } from '../auth/auth.guard';
const routes: Routes = [
    {
        path: '',
        component: FrameComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: WelcomeComponent },
            { path: '**', component: Page404Component }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrameRoutingModule { }
