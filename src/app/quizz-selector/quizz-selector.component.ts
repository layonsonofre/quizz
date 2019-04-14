import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-quizz-selector',
  templateUrl: './quizz-selector.component.html',
  styleUrls: ['./quizz-selector.component.sass']
})
export class QuizzSelectorComponent implements OnInit {
  quizzes: Observable<any[]>;

  constructor(public dataService: DataService, public router: Router, public utils: UtilsService) {}

  ngOnInit() {
    this.quizzes = this.dataService.getCollection('quizzes/');
    this.quizzes.subscribe();
  }

  play(quizz: any) {
    this.router.navigate(['play/' + quizz.id]);
  }

}


