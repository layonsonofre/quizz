import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      localStorage.setItem('user', !!user ? JSON.stringify(user) : null);
    })
  }

  async  login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      this.router.navigate(['admin/quizzes']);
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}
