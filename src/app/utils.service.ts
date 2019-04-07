import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  calcDeadline(quizz: any): number {
    let deadline = quizz.questions
      .map((question) => +question.deadline)
      .reduce((sum, current) => sum + current);
    return deadline;
  }
}
