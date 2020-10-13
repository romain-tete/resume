import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResourceFormMutexService {
  mutexHolder: MutexConsumer;

  yieldMutex(directive: MutexConsumer): void {
    if (this.mutexHolder === directive) {
      this.mutexHolder = null;
    }
  }

  claimMutex(directive: MutexConsumer): Observable<boolean> {
    if (this.mutexHolder) {
      return this.mutexHolder.requestMutexRestitution().pipe(
        take(1),
        tap((yielded) => {
          if (yielded) {
            this.mutexHolder = directive;
          }
        })
      );
    } else {
      this.mutexHolder = directive;
      return of(true);
    }
  }
}

export interface MutexConsumer {
  requestMutexRestitution: () => Observable<boolean>;
}
