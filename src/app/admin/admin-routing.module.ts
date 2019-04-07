import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { QuizzesListComponent } from './quizzes-list/quizzes-list.component';

const routes: Routes = [{
  path: 'admin',
  component: AdminComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'quizzes', component: QuizzesListComponent, canActivate: [AdminGuard] },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
