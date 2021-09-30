import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { RobotDefinition } from '../models/robot-definition';

@Injectable({providedIn: 'root'})
export class RobotDefinitionsService {

  constructor(private httpClient: HttpClient) { }

  getAll() : Observable<RobotDefinition[]> {
    return this.httpClient.get<RobotDefinition[]>(`${environment.apiUrl}/api/robots-definitions`);
  }

}
