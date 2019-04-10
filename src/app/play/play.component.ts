import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.sass']
})
export class PlayComponent implements OnInit, OnDestroy {
  sub: any;
  quizzId: string;
  quizzSub: any;
  quizz: any;
  playing: boolean;
  question: number;
  finish: boolean;
  corrects: number;
  deadline: number;
  time: number;
  results: any[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dataService: DataService, public utils: UtilsService) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params['quizzId']) {
        this.quizzId = params['quizzId'];
        this.getQuizz();
      } else {
        this.router.navigate(['']);
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

  start() {
    this.deadline = undefined;
    this.question = 0;
    this.time = 0;
    this.sort();
    this.playing = true;
    this.finish = false;
  }

  sort() {
    this.quizz.questions = this.quizz.questions.sort((a, b) => a.order - b.order);
    this.randomAnswers();
  }

  randomAnswers() {
    for (let i = this.quizz.questions[this.question].answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.quizz.questions[this.question].answers[i], this.quizz.questions[this.question].answers[j]] = [this.quizz.questions[this.question].answers[j], this.quizz.questions[this.question].answers[i]];
    }
    this.choose(this.quizz.questions[this.question].answers[0]);
  }

  stop() {
    this.playing = false;
  }

  next() {
    this.question += 1;
    let deadlineIndex = this.question - 1;
    if (this.question >= this.quizz.questions.length) {
      this.checkResult();
    } else {
      this.randomAnswers();
    }
    this.time += this.deadline == 0 ? this.quizz.questions[deadlineIndex].deadline : (this.quizz.questions[deadlineIndex].deadline - this.deadline);
  }

  choose(answer: any) {
    if (typeof this.deadline == 'undefined' || this.deadline > 0) {
      answer.selected = !answer.selected;
      this.quizz.questions[this.question].answers.forEach(a => {
        if (a.text != answer.text) {
          a.selected = false;
        }
      });
    }
  }

  checkResult() {
    this.corrects = this.quizz.questions.map(item => item.answers.filter(a => a.selected)[0]).filter(item => item.correct).length;
    this.results = [];
    for (let i = 0; i < this.quizz.questions.length; i++) {
      this.results.push({question: this.quizz.questions[i].question});
      for (let j = 0; j < this.quizz.questions[i].answers.length; j++) {
        if (this.quizz.questions[i].answers[j].selected) {
          this.results[i].user = this.quizz.questions[i].answers[j].text;
        }
        if (this.quizz.questions[i].answers[j].correct) {
          this.results[i].correct = this.quizz.questions[i].answers[j].text;
        }
      }
    }
    this.finish = true;
  }

  setDeadline(count: number) {
    this.deadline = count;
    if (count == 0) {
      setTimeout(() => {
        this.next();
      }, 3000);
    }
  }
}
