import { Directive, HostBinding, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

const BASE =
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg border transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent border-accent text-white hover:bg-accent-dark',
  outline: 'bg-surface border-border text-text hover:bg-surface-2',
  ghost: 'bg-transparent border-transparent text-text-2 hover:bg-surface-2',
  danger: 'bg-error border-error text-white hover:opacity-90',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
};

@Directive({
  selector: '[appButton]',
})
export class ButtonDirective {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';

  @HostBinding('class')
  get classes() {
    return `${BASE} ${VARIANTS[this.variant]} ${SIZES[this.size]}`;
  }
}
