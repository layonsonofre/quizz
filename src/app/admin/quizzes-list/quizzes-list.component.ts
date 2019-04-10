import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../data.service';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-quizzes-list',
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.sass']
})
export class QuizzesListComponent implements OnInit {
  quizzes: Observable<any[]>;

  constructor(private dataService: DataService, public utils: UtilsService) { }

  ngOnInit() {
    this.quizzes = this.dataService.getCollection('quizzes/');
    this.quizzes.subscribe();
  }

  delete(quizz) {
    if (!quizz.toDelete) {
      quizz.toDelete = true;
      setTimeout(() => {
        delete quizz.toDelete;
      }, 5000);
    } else {
      console.log('actually deleting');
      // this.dataService
      //   .deleteDocument('quizzes/' + quizz.id)
      //   .then(() => {
      //     console.log('sucesso')
      //   }, (err) => {
      //     console.log('erro: ', err)
      //   });
    }
  }

}
