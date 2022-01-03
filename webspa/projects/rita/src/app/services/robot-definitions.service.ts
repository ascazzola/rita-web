import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RobotDefinition } from '../models/robot-definition';

@Injectable({ providedIn: 'root' })
export class RobotDefinitionsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<RobotDefinition[]> {
    return this.httpClient.get<RobotDefinition[]>(`${environment.apiUrl}/api/robots-definitions`);
  }

  getById(id: string): Observable<RobotDefinition> {
    return this.httpClient.get<RobotDefinition>(`${environment.apiUrl}/api/robots-definitions/${id}`);
  }

  insert(robotDefinition: RobotDefinition): Observable<RobotDefinition> {
    return this.httpClient.post<RobotDefinition>(`${environment.apiUrl}/api/robots-definitions`, robotDefinition);
  }

  update(robotDefinition: RobotDefinition): Observable<RobotDefinition> {
    const id = robotDefinition.id;
    return this.httpClient.put<RobotDefinition>(`${environment.apiUrl}/api/robots-definitions/${id}`, robotDefinition);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete<RobotDefinition>(`${environment.apiUrl}/api/robots-definitions/${id}`);
  }


}
