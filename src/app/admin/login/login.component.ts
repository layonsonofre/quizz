import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.email = null;
    this.password = null;
  }

  doLogin() {
    this.authService.login(this.email, this.password);
  }

}
