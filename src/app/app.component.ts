import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: Observable<any[]>;

  constructor(db: AngularFirestore, private authService: AuthService, private location: Location) {
    this.items = db.collection('quizzes').valueChanges();
  }
}
