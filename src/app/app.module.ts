import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { QuizzSelectorComponent } from './quizz-selector/quizz-selector.component';
import { PlayComponent } from './play/play.component';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { UtilsService } from './utils.service';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizzSelectorComponent,
    PlayComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AdminModule
  ],
  exports: [
    QuizzSelectorComponent
  ],
  providers: [
    DataService,
    AuthService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
