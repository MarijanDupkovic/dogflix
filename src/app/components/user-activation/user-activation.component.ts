import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.scss']
})
export class UserActivationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.activateUser();
  }

  async activateUser() {
    this.route.params.subscribe(params => {
      const url = environment.baseUrl + '/activate/' + params['token'];
      lastValueFrom(this.http.get(url));
      setTimeout(() => window.location.href = '/login', 2000);
    });
  }
}