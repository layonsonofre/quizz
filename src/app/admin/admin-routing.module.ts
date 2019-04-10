import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { QuizzesListComponent } from './quizzes-list/quizzes-list.component';
import { QuizzEditorComponent } from './quizz-editor/quizz-editor.component';

const routes: Routes = [{
  path: 'admin',
  component: AdminComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'quizzes', component: QuizzesListComponent, canActivate: [AdminGuard] },
    { path: 'quizzes/create', component: QuizzEditorComponent, canActivate: [AdminGuard] },
    { path: 'quizzes/edit/:quizzId', component: QuizzEditorComponent, canActivate: [AdminGuard] },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
