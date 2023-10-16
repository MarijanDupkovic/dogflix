import { Component } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent {

  constructor(private location:Location){

  }

  getBack(){
    this.location.back();
  }
}
