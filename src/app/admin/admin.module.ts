import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { QuizzesListComponent } from './quizzes-list/quizzes-list.component';
import { QuizzEditorComponent } from './quizz-editor/quizz-editor.component';

@NgModule({
  declarations: [
    LoginComponent,
    AdminComponent,
    QuizzesListComponent,
    QuizzEditorComponent
  ],
  exports: [
    AdminComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
