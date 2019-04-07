import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.sass']
})
export class PlayComponent implements OnInit {
  sub: any;
  quizzId: string;
  quizzSub: any;
  quizz: any;
  playing: boolean;
  question: number;

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
    this.question = 0;
    this.sort();
    this.playing = true;
  }

  sort() {
    this.quizz.questions = this.quizz.questions.sort((a, b) => a.order - b.order);
    this.randomAnswers();
  }

  randomAnswers() {
    this.quizz.questions[this.question].answers.sort((a, b) => a.text - b.text);
  }

  stop() {
    this.playing = false;
  }

  next() {
    this.question += 1;

  }
}
