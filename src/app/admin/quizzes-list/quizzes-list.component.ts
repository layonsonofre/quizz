import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quizzes-list',
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.sass']
})
export class QuizzesListComponent implements OnInit {
  items: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.items = this.db.collection('quizzes').valueChanges();
  }

  ngOnInit() {
  }

}
