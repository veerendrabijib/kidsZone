import {
 Component,
 ChangeDetectionStrategy,
 ElementRef,
 QueryList,
 ViewChildren,
 AfterViewInit,
 effect,
 input,
 output
} from '@angular/core';

/**
 * ChipsListComponent displays a list of selectable chips.
 * Emits selection changes and scrolls to the active chip.
 */
@Component({
 selector: 'lib-chips-list',
 standalone: true,
 templateUrl: './chips-list.html',
 changeDetection: ChangeDetectionStrategy.OnPush,
 host: {
  class: 'flex gap-2 w-full overflow-x-auto snap-x snap-mandatory',
  role: 'group'
 }
})
export class ChipsList implements AfterViewInit {

 // References to chip elements in the template
 @ViewChildren('chip', { read: ElementRef })
 private chips!: QueryList<ElementRef<HTMLElement>>

 // Input: List of chips to display
 readonly chipsList = input.required<ChipType[]>()

 // Input: Currently selected chip id
 readonly selectedChip = input<string | number>()

 // Output: Emits when a chip is selected
 readonly selectionEmit = output<string | number>()

 constructor() {
  // Effect: Scroll to active chip when selectedChip changes
  effect(() => {
   this.selectedChip()
   queueMicrotask(() => this.scrollToActive())
  })
 }

 // Lifecycle: Scroll to active chip after view initialization
 ngAfterViewInit() {
  this.scrollToActive()
 }

 /**
  * Handles chip selection.
  * Emits selection if chip is not already selected.
  */
 protected selectChip(chip: ChipType) {
  if (chip.id === this.selectedChip()) return
  this.selectionEmit.emit(chip.id)
 }

 /**
  * Scrolls the active chip into view.
  */
 private scrollToActive() {
  if (!this.chips) return

  const activeChip = this.chips.find(c => c.nativeElement.classList.contains('active'))

  activeChip?.nativeElement.scrollIntoView({
   behavior: 'smooth',
   inline: 'center',
   block: 'nearest'
  })
 }
}

/**
 * ChipType interface describes a chip item.
 */
export interface ChipType {
 id: string | number;
 name: string;
 icon?: string;
}