import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({
 selector: "lib-button",
 standalone: true,
 imports: [CommonModule],
 templateUrl: "./button.html",

 changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonLib {

 @Input() type: "button" | "submit" | "reset" = "button";
 @Input() disabled = false;
 @Input() loading = false;
 @Input() loadingText = "";

 @Output() buttonClick = new EventEmitter<void>();

 handleClick(): void {
  if (this.disabled || this.loading) return;
  this.buttonClick.emit();
 }
}