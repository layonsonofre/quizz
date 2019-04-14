import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-quizz-editor',
  templateUrl: './quizz-editor.component.html',
  styleUrls: ['./quizz-editor.component.sass']
})
export class QuizzEditorComponent implements OnInit {
  sub: any;
  quizzId: string;
  quizzSub: any;
  quizz: any;
  creating: boolean;
  saving: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService, private location: Location, private utils: UtilsService) { }

  ngOnInit() {
    this.creating = false;
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params['quizzId']) {
        this.quizzId = params['quizzId'];
        this.getQuizz();
      } else {
        if (this.router.url.indexOf('create') == -1) {
          this.router.navigate(['admin/quizzes']);
        } else {
          this.creating = true;
          this.clearFields();
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getQuizz() {
    this.quizzSub = this.dataService.getDocument('quizzes/' + this.quizzId);
    this.quizzSub.subscribe(data => {
      this.quizz = data;
    });
  }

  goBack() {
    this.location.back();
  }

  clearFields() {
    this.quizz = {
      title: null,
      description: null,
      image: null
    }
    this.addBlankQuestion();
  }

  addBlankQuestion() {
    if (!this.quizz.questions || !this.quizz.questions.length) {
      this.quizz.questions = []
    }
    this.quizz.questions.push({
      question: null,
      order: this.quizz.questions.length,
      deadline: 0,
      image: null
    });
    this.addBlankAnswer();
  }

  removeQuestion(questionIndex: number) {
    if (this.quizz.questions[questionIndex]) {
      this.quizz.questions.splice(questionIndex, 1);
    }
  }

  addBlankAnswer(index: number = this.quizz.questions.length - 1) {
    if (!this.quizz.questions[index].answers || !this.quizz.questions[index].answers.length) {
      this.quizz.questions[index].answers = []
    }
    this.quizz.questions[index].answers.push({
      text: null,
      correct: false
    });
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    if (this.quizz.questions[questionIndex] && this.quizz.questions[questionIndex].answers[answerIndex]) {
      this.quizz.questions[questionIndex].answers.splice(answerIndex, 1);
    }
  }

  save() {
    if (this.formIsValid()) {
      this.saving = true;
      if (this.creating) {
        let temp = Object.assign({}, this.quizz);
        this.dataService
          .createDocument('quizzes/' + this.utils.generateRandomString(32), temp)
          .then((res) => {
            this.router.navigate(['/admin/quizzes']);
            this.saving = false;
            this.utils.addNotification({ description: 'Quizz inserido com sucesso' });
          }, (err) => {
            this.saving = false;
            this.utils.addNotification({ description: 'Falha ao inserir o quizz' + err });
          });
      } else {
        let temp = Object.assign({}, this.quizz);
        delete temp.id;
        this.dataService
          .updateDocument('quizzes/' + this.quizz.id, temp)
          .then((res) => {
            this.router.navigate(['/admin/quizzes']);
            this.saving = false;
            this.utils.addNotification({ description: 'Quizz atualizado com sucesso'});
          }, (err) => {
            this.saving = false;
            this.utils.addNotification({description: 'Falha ao atualizar o quizz' + err});
          });
      }
    }
  }

  formIsValid() {
    return this.quizz && this.quizz.title && this.quizz.description;
  }

}
