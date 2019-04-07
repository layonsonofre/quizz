import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizzSelectorComponent } from './quizz-selector/quizz-selector.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  { path: '', component: QuizzSelectorComponent},
  { path: 'play/:quizzId', component: PlayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
