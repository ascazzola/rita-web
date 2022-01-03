import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Battle, NewBattle } from 'models/battle';
import { RxStompService } from '@stomp/ng2-stompjs';
import { map } from 'rxjs/operators';
import { BattleEvent } from 'models/battle-event';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BattlesService {

  constructor(private httpClient: HttpClient, private rxStompService: RxStompService) { }

  createBattle(battle: NewBattle): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiUrl}/api/battles`, battle);
  }

  startBattle(id: string): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiUrl}/api/battles/${id}/start`, {});
  }

  getBattles(): Observable<Battle[]> {
    return this.httpClient.get<Battle[]>(`${environment.apiUrl}/api/battles`);
  }

  getBattlesEvents(): Observable<Battle[]> {
    return this.rxStompService.watch(`/topic/battles`).pipe(map(x => JSON.parse(x.body) as Battle[]));
  }

  getBattle(id: string): Observable<Battle> {
    return this.httpClient.get<Battle>(`${environment.apiUrl}/api/battles/${id}`);
  }

  getBattleEvents(id: string): Observable<BattleEvent> {
    return this.rxStompService.watch(`/topic/battles/${id}`).pipe(
      map(x => JSON.parse(x.body) as BattleEvent));
  }
}
