import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  notifications: any[];

  constructor() { }

  calcDeadline(quizz: any): number {
    let deadline = quizz.questions
      .map((question) => +question.deadline)
      .reduce((sum, current) => sum + current);
    return deadline;
  }

  addNotification(note) {
    if (!this.notifications || !this.notifications.length) {
      this.notifications = [];
    }
    note.id = this.generateRandomString(7);
    this.notifications.push(note);
    setTimeout(() => {
      this.dismiss(note.id);
    }, 10000);
  }

  dismiss(noteId) {
    let index = this.notifications.map((item) => item.id).indexOf(noteId);
    if (index >= 0) {
      this.notifications.splice(index, 1);
    }
  }

  generateRandomString(length) {
    return Math.random().toString(36).substring(length);
  }

  share(quizzId) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.origin + '/play/' + quizzId;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.addNotification({description: 'Link para o quizz copiado!'});
  }
}
