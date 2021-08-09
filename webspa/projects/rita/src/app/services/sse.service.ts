import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SseService {

  constructor(private zone: NgZone) { }

  serverSentEvents$<T>(url: string) {
    return new Observable<T>(observer => {
      const battleEvents = new EventSource(url);

      battleEvents.onmessage = x => this.zone.run(() => observer.next(JSON.parse(x.data) as T));

      battleEvents.onerror = error => this.zone.run(() => observer.error(error));

      return () => {
        console.warn('close');
        battleEvents.close();
      };
    });
  }
}
