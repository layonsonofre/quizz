import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {

  constructor(public utils: UtilsService) { }

  ngOnInit() {
  }

}
