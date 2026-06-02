import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'lib-toggle',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './toggle.html',

 changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleLib {

 @Input() isEnabled = false;
 @Input() disabled = false;
 @Output() toggleClick = new EventEmitter<boolean>();

 handleToggle(event: Event): void {
  if (this.disabled) return;
  const checked = (event.target as HTMLInputElement).checked;
  this.isEnabled = checked;
  this.toggleClick.emit(checked);
 }
}