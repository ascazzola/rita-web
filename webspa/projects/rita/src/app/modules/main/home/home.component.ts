import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  username!: Observable<string>;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.username = from(this.keycloakService.loadUserProfile()).pipe(map(x => x.firstName && x.lastName && `${x.firstName} ${x.lastName}` || x.username || 'Usuario'));
  }
}
