import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'lib-progress-bar',
 templateUrl: './progress-bar.html',
 standalone: true,
 imports: [CommonModule]
})
export class ProgressBarLib {
 @Input({ required: true }) value: number = 0;

 get fillWidth(): number {
  return Math.max(0, Math.min(this.value, 1)) * 100;
 }
}

