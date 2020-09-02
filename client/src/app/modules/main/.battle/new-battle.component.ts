import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './new-battle.component.html',
  styleUrls: ['./new-battle.component.scss']
})
export class NewBattleComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  newBattle() {
    this.httpClient.post(`${environment.apiUrl}/api/battles`, {}).subscribe(id => {
      this.router.navigate(['battles', id, 'detail']);
    });
  }

}
