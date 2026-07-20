import { Component, ElementRef, inject, input, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlock } from '../../../models/project.model';

@Component({
  selector: 'app-code-block-card',
  imports: [CommonModule],
  templateUrl: './code-block-card.html',
})
export class CodeBlockCard {
  private elRef = inject(ElementRef<HTMLElement>);

  block = input.required<CodeBlock>();
  copied = signal(false);

  constructor() {
    effect(() => {
      const block = this.block();
      const hljs = (window as any)['hljs'];
      if (!hljs) return;
      setTimeout(() => {
        const codeEl = this.elRef.nativeElement.querySelector('code');
        if (!codeEl) return;
        codeEl.removeAttribute('data-highlighted');
        hljs.highlightElement(codeEl);
      }, 0);
    });
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.block().code).catch(() => {});
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
