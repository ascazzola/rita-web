import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Battle, NewBattle } from 'models/battle';
import { BattleSnapshot } from 'models/battle-snapshot';
import { BattleResult } from 'models/battle-result';
import { RxStompService } from '@stomp/ng2-stompjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BattlesService {

  constructor(private httpClient: HttpClient, private rxStompService: RxStompService) { }

  createBattle(battle: NewBattle): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiUrl}/api/battles`, battle);
  }

  startBattle(id: string): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiUrl}/api/battles/${id}/start`, {});
  }

  getBattlesEvents(): Observable<Battle[]> {
    return this.rxStompService.watch(`/topic/battles`).pipe(map(x => JSON.parse(x.body) as Battle[]));
  }

  getBattleEvents(id: string): Observable<BattleEvent> {
    return this.rxStompService.watch(`/topic/battles/${id}`).pipe(
      map(x => JSON.parse(x.body) as BattleEvent));
  }
}
export type BattleEvent = BattleStarted | RoundStarted | TurnChanged | BattleFinished;

export interface BattleStarted {
  type: 'BattleStartedEvent';
  numberOfRounds: number;
  gunCoolingRate: number;
  inactivityTime: number;
  robotsCount: number;
  isReplay: boolean;
}

export interface RoundStarted {
  type: 'RoundStartedEvent';
  round: number;
  startSnapshot: BattleSnapshot;
}

export interface TurnChanged {
  type: 'TurnEndedEvent';
  turnSnapshot: BattleSnapshot;
}

export interface BattleFinished {
  type: 'BattleCompletedEvent';
  results: BattleResult[];
}
