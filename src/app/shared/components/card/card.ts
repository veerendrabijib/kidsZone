import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

/**
 * Wrapper card with configurable rounded, shadow, and border via attributes.
 * Projects content via ng-content; styling via card.scss and host bindings.
 */
@Component({
 selector: 'lib-card',
 template: `<ng-content></ng-content>`,
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
 /** Host bindings for rounded, shadow, border attributes. */
 @HostBinding('attr.rounded') _rounded?: CardRounded;
 @HostBinding('attr.shadow') _shadow?: CardShadow;
 @HostBinding('attr.border') _border?: CardBorder;
 @HostBinding('attr.shade') _shade?: CardShade;
 @HostBinding('class') hostClasses = 'block p-4 transition-all rounded-xl shadow-md border border-slate-300 bg-white';

 /*** Input setters to update host classes whenever inputs change */
 @Input() set rounded(value: CardRounded) {
  this._rounded = value;
  this.updateClasses();
 };

 @Input() set shadow(value: CardShadow) {
  this._shadow = value;
  this.updateClasses();
 };

 @Input() set border(value: CardBorder) {
  this._border = value;
  this.updateClasses();
 };

 @Input() set shade(value: CardShade) {
  this._shade = value;
  this.updateClasses();
 };

 private updateClasses(): void {
  const roundedClass = this._rounded === 'none' ? 'rounded-none' : this._rounded === 'sm' ? 'rounded-sm' : this._rounded === 'lg' ? 'rounded-2xl' : 'rounded-xl';
  const shadowClass = this._shadow === 'none' ? '' : this._shadow === 'sm' ? 'shadow-sm' : this._shadow === 'lg' ? 'shadow-lg' : 'shadow-md';
  const borderClass = this._border === 'none' ? '' : this._border === 'sm' ? 'border border-slate-200' : this._border === 'lg' ? 'border-2 border-slate-300' : 'border border-slate-300';
  const shadeClass = this._shade === 'secondary' ? 'bg-slate-50' : this._shade === 'tertiary' ? 'bg-slate-100' : this._shade === 'hover' ? 'bg-slate-200' : 'bg-white';

  this.hostClasses = ['block', 'p-4', 'transition-all', roundedClass, shadowClass, borderClass, shadeClass]
   .filter(Boolean)
   .join(' ');
 }
}

/**
 * Rounded corner options for the CardComponent.
 * - 'none' : No rounding, sharp corners
 * - 'sm'   : Small rounding
 * - 'md'   : Medium rounding (default)
 * - 'lg'   : Large rounding
 */
export type CardRounded = 'none' | 'sm' | 'md' | 'lg';

/**
 * Shadow intensity options for the CardComponent.
 * - 'none' : No shadow
 * - 'sm'   : Small shadow
 * - 'md'   : Medium shadow (default)
 * - 'lg'   : Large shadow
 */
export type CardShadow = 'none' | 'sm' | 'md' | 'lg';

/**
 * Border thickness/style options for the CardComponent.
 * - 'none' : No border
 * - 'sm'   : Thin border
 * - 'md'   : Medium border (default)
 * - 'lg'   : Thick border
 */
export type CardBorder = 'none' | 'sm' | 'md' | 'lg';

/**
 * Background shade variants for the CardComponent.
 * These represent different UI states or hierarchy levels.
 * Options:
 * - 'primary'   : Main card background (default card color).
 * - 'secondary' : Slightly different background used for nested or secondary cards.
 * - 'tertiary'  : Alternative background for deeper UI hierarchy.
 * - 'hover'     : Background used when the card is hovered or highlighted.
 */
export type CardShade = 'primary' | 'secondary' | 'tertiary' | 'hover';
