import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../layout/auth/auth';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Main } from '../../../layout/main/main';
import { LAYOUT } from '../../utils/constant';
import { TestLayout } from '../../../layout/test-layout/test-layout';
import { Empty as EmptyLayout } from '../../../layout/empty/empty';

@Component({
  selector: 'app-configure-layout',
  imports: [CommonModule, Auth, RouterOutlet, Main, TestLayout, EmptyLayout],
  templateUrl: './configure-layout.html',
  styleUrl: './configure-layout.css',
})
export class ConfigureLayout {
  layoutKeys = LAYOUT;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  get layout(): string {
    let current: ActivatedRoute | null = this.route;

    // Walk DOWN to deepest active route
    while (current?.firstChild) {
      current = current.firstChild;
    }

    // Walk UP until we find layout
    while (current) {
      const layout = current.snapshot.data['layout'];
      if (layout) return layout;
      current = current.parent;
    }

    return 'main'; // fallback
  }
}
