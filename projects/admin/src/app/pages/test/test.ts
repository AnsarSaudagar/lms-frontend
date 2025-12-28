import { Component } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-test',
  imports: [Button, RouterLink, ButtonDirective],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {

}
