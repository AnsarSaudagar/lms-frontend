import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="bg-surface border border-border rounded-xl shadow-xs" [class.p-6]="padded">
      <ng-content />
    </div>
  `,
})
export class Card {
  @Input() padded = true;
}
