import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
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
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }