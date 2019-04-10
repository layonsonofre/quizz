import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService, private location: Location) { }

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
      console.log(this.quizz);
    });
  }

  goBack() {
    this.location.back();
  }

  clearFields() {
    this.quizz = {
      title: null,
      description: null
    }
    this.addBlankQuestion();
  }

  addBlankQuestion() {
    if (!this.quizz.questions || !this.quizz.questions.length) {
      this.quizz.questions = []
    }
    this.quizz.questions.push({
      question: null,
      order: 1,
      deadline: 0
    });
    this.addBlankAnswer();
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

  save() {
    if (this.formIsValid()) {
      if (this.creating) {

      } else {
        let temp = Object.assign({}, this.quizz);
        delete temp.id;
        this.dataService
          .updateDocument('quizzes/' + this.quizz.id, temp)
          .then((res) => {
            console.log(res);
          }, (err) => {
            console.log('err: ' + err)
          })
          .catch((err) => {
            console.log('catching: ' + err);
          });
      }
    }
  }

  formIsValid() {
    return this.quizz && this.quizz.title && this.quizz.description;
  }

}
