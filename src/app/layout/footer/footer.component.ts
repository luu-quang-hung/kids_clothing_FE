import { Component, OnInit } from '@angular/core';
import { faPhone, faMapPin, faEnvelope, faUsers, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { facebookIcon} from '@progress/kendo-svg-icons';
import {googleBoxIcon} from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faPhone = faPhone;
  faMapPin = faMapPin;
  faEnvelope = faEnvelope;
  facebookIcon = facebookIcon;
  faUsers = faUsers;
  faMailBulk = faMailBulk;
  public icons = { facebookIcon: facebookIcon,googleBoxIcon: googleBoxIcon };

  constructor() { }

  ngOnInit(): void {
  }

}
