import { Component } from '@angular/core';
import { Common } from './services/common';

@Component({
  selector: 'lib-shared',
  imports: [],
  template: `
    <p>
      shared works!
    </p>
  `,
  styles: ``,
  providers: [Common]
})
export class Shared {

}
