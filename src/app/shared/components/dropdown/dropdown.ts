import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output, forwardRef, inject } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { OptionKeys, RoundedType, SizeType } from "../component.interface";

/**
 * Native select dropdown with configurable options via optionKeys (labelKey/valueKey).
 * Supports reactive forms and emits selectionChange with the selected object.
 */

export interface DropdownConfig {
 size?: SizeType;
 rounded?: RoundedType;
 interface?: "popover" | "alert" | "action-sheet" | "modal";
 label?: string;
 placeholder?: string;
 helperText?: string;
 errorText?: string;
 required?: boolean;
 disabled?: boolean;
 isInvalid?: boolean;
 clearValue?: boolean;
}

const DEFAULT_CONFIG: DropdownConfig = {
 size: "md",
 rounded: "md",
 interface: "popover",
 required: false,
 disabled: false,
 isInvalid: false,
 clearValue: false
};

@Component({
 selector: "lib-dropdown",
 standalone: true,
 imports: [CommonModule],
 templateUrl: "./dropdown.html",
 providers: [
  {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => DropdownLib),
   multi: true
  }
 ],
 changeDetection: ChangeDetectionStrategy.OnPush,
 host: {
  "[attr.size]": "config.size",
  "[attr.rounded]": "config.rounded"
 }
})
export class DropdownLib implements ControlValueAccessor, OnInit {
 private cd = inject(ChangeDetectorRef);
 private injector = inject(Injector);
 ngControl: NgControl | null = null;

 value: any = null;
 private optionsMap = new Map<any, any>();
 private rafId: number | null = null;

 private _config: DropdownConfig = DEFAULT_CONFIG;
 private _options: any[] = [];
 private _optionKeys: OptionKeys = { labelKey: "", valueKey: "" };

 @Input() set config(value: DropdownConfig | null) {
  this._config = { ...DEFAULT_CONFIG, ...value };
  this.cd.markForCheck();
 }

 @Input() set options(value: any[]) {
  if (this._options !== value) {
   this._options = value ?? [];
   this.updateOptionsMap();
  }
 }

 @Input() set optionKeys(value: OptionKeys) {
  if (this._optionKeys !== value) {
   this._optionKeys = value ?? { labelKey: "", valueKey: "" };
   this.updateOptionsMap();
  }
 }

 @Output() selectionChange = new EventEmitter<any>();
 @Output() selectionClear = new EventEmitter<any>();

 get config(): DropdownConfig {
  return this._config;
 }

 get options(): any[] {
  return this._options;
 }

 get optionKeys(): OptionKeys {
  return this._optionKeys;
 }

 get clearIcon(): any {
  return this._config.clearValue && this.value !== null && this.value !== undefined && this.value !== "";
 }

 ngOnInit() {
  this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
 }

 private updateOptionsMap(): void {
  const map = this.optionsMap;
  map.clear();

  const valueKey = this._optionKeys.valueKey;
  if (!valueKey) return;

  for (let i = 0; i < this._options.length; i++) {
   const opt = this._options[i];
   map.set(opt[valueKey], opt);
  }

  this.cd.markForCheck();
 }

 private syncSelection(value: any) {
  if (this.rafId) cancelAnimationFrame(this.rafId);
  this.rafId = requestAnimationFrame(() => {
   this.value = value;
   this.cd.markForCheck();
   this.rafId = null;
  });
 }

 onChange: (value: any) => void = () => { };
 onTouched: () => void = () => { };

 writeValue(value: any): void {
  this.syncSelection(value ?? null);
 }

 registerOnChange(fn: (value: any) => void): void {
  this.onChange = fn;
 }

 registerOnTouched(fn: () => void): void {
  this.onTouched = fn;
 }

 setDisabledState(disabled: boolean): void {
  if (this._config.disabled !== disabled) {
   this._config.disabled = disabled;
   this.cd.markForCheck();
  }
 }

 handleBlur() {
  if (this.config.disabled) return;
  this.onTouched();
 }

 handleChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  const value = select.value === "" ? null : select.value;

  this.value = value;
  this.onChange(value);
  this.onTouched();

  this.selectionChange.emit(this.optionsMap.get(value));
  this.cd.markForCheck();
 }

 handleClear() {
  this.value = null;
  this.selectionClear.emit();
  this.cd.markForCheck();
 }

 trackOption(_index: number, option: any) {
  return option[this._optionKeys.valueKey];
 }
}