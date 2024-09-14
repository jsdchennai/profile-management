import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileProgressService {
  progressValue$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}

  getProgressValue() {
    return this.progressValue$.asObservable();
  }

  setProgressValue(value: number) {
    this.progressValue$.next(value);
  }
}
