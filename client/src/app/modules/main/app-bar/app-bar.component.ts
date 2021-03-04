import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {

  constructor(private readonly keycloak: KeycloakService) { }

  async logout() {
    await this.keycloak.logout();
  }
}
