import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private counter = signal(0);

  loading = computed(() => this.counter() > 0);

  show() {
    this.counter.update(c => c + 1);
  }

  hide() {
    this.counter.update(c => Math.max(0, c - 1));
  }
}
