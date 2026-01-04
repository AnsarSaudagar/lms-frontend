import { Component } from '@angular/core';
import { Common } from './services/common';
import { DurationPipe } from './pipes/duration.pipe';

@Component({
  selector: 'lib-shared',
  imports: [],
  template: `
    <p>
      shared works!
    </p>
  `,
  styles: ``,
  providers: [Common, DurationPipe]
})
export class Shared {

}
