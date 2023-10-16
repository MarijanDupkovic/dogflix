import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-data-protection',
  templateUrl: './data-protection.component.html',
  styleUrls: ['./data-protection.component.scss']
})
export class DataProtectionComponent {
  constructor(private location:Location){

  }

  getBack(){
    this.location.back();
  }
}
