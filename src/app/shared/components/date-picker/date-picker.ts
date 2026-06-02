import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, inject, Input, Output } from '@angular/core';
import { MaxDate, MinDate, PickerMode } from './date-picker.types';
import { RoundedType, SizeType } from '../component.interface';

export interface DatePickerValue {
 mode: PickerMode;
 value: string | string[] | null;
}

export interface DatePickerConfig {
 mode?: PickerMode;
 min?: MinDate;
 max?: MaxDate;
 value?: string | string[] | null;
 size?: SizeType;
 rounded?: RoundedType;
 label?: string;
 required?: boolean;
 placeholder?: string | null;
 format?: string | null;
 readonly?: boolean;
}

const DEFAULT_CONFIG: DatePickerConfig = {
 mode: 'DatePicker',
 value: null,
 placeholder: 'Select Date',
 format: 'DD/MM/YYYY',
 readonly: false,
 required: false,
};

@Component({
 selector: 'lib-date-picker',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './date-picker.html',
 changeDetection: ChangeDetectionStrategy.OnPush,
 providers: [
  {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => DatePicker),
   multi: true,
  },
 ],
})
export class DatePicker implements ControlValueAccessor {
 @HostBinding('attr.size') host_size?: string;
 @HostBinding('attr.rounded') host_rounded?: string;

 private _config: DatePickerConfig = DEFAULT_CONFIG;

 @Input() set config(config: DatePickerConfig | null | undefined) {
  this._config = { ...DEFAULT_CONFIG, ...(config ?? {}) };
  this.host_size = this._config?.['size'] ?? 'md';
  this.host_rounded = this._config?.['rounded'] ?? undefined;
  this.configValue();
  this.ref.markForCheck();
 }

 get config(): DatePickerConfig {
  return this._config;
 }

 @Output() onDateChange = new EventEmitter<DatePickerValue>();

 private readonly ref = inject(ChangeDetectorRef);
 picker_params: DatePickerValue = {
  mode: 'DatePicker',
  value: null,
 };

 private onChange: any = (value: any) => { };
 private onTouched: any = () => { };

 writeValue(value: string | string[] | null): void {
  this.picker_params['value'] = value;
  this.ref.markForCheck();
 }

 registerOnChange(fn: any): void {
  this.onChange = fn;
 }

 registerOnTouched(fn: any): void {
  this.onTouched = fn;
 }

 setDisabledState(isDisabled: boolean): void {
  this._config['readonly'] = isDisabled;
  this.ref.markForCheck();
 }

 configValue(): void {
  this.picker_params['mode'] = this._config?.['mode'] ?? 'DatePicker';
  this.picker_params['value'] = this._config?.['value'] ?? null;
  this.ref.markForCheck();
 }

 handleSingleDateChange(event: Event): void {
  if (this._config['readonly']) return;
  const target = event.target as HTMLInputElement;
  const rawValue = target.value;
  this.picker_params['value'] = rawValue || null;
  this.onChange(this.picker_params['value']);
  this.onTouched();
  this.onEmit();
  this.ref.markForCheck();
 }

 handleMultiDateChange(date: string, event: Event): void {
  if (this._config['readonly']) return;
  const target = event.target as HTMLInputElement;
  const rawValue = target.value;
  const values = this.multiDates.slice();
  const index = values.indexOf(date);
  if (index === -1) return;
  values[index] = rawValue;
  this.picker_params['value'] = values;
  this.onChange(values);
  this.onTouched();
  this.onEmit();
  this.ref.markForCheck();
 }

 addDate(): void {
  if (this._config['readonly']) return;
  const values = this.multiDates.slice();
  values.push('');
  this.picker_params['value'] = values;
  this.onChange(values);
  this.ref.markForCheck();
 }

 removeDate(date: string): void {
  if (this._config['readonly']) return;
  const values = this.multiDates.filter((value) => value !== date);
  this.picker_params['value'] = values.length > 0 ? values : null;
  this.onChange(this.picker_params['value']);
  this.onTouched();
  this.onEmit();
  this.ref.markForCheck();
 }

 onEmit(): void {
  this.onDateChange.emit(this.picker_params);
 }

 get getClasses() {
  const classes = [
   this._config['rounded'] ? `rounded-${this._config['rounded']}` : undefined,
   this._config['readonly'] ? 'readonly' : undefined,
  ].filter(Boolean).join(' ');
  return classes;
 }

 get isMultiMode(): boolean {
  return this._config['mode'] === 'MultiDatePicker';
 }

 get multiDates(): string[] {
  if (Array.isArray(this.picker_params['value'])) {
   return this.picker_params['value'] as string[];
  }
  return this.picker_params['value'] ? [this.picker_params['value'] as string] : [];
 }

 get getValue() {
  if (this.picker_params['value']) {
   if (this.isMultiMode) {
    const values = this.multiDates.filter((value) => !!value);
    return values.length ? values.map((date) => this.formatDate(date)).join(', ') : this._config['placeholder'] || 'Select Date';
   }
   return this.formatDate(this.picker_params['value']);
  }
  return this._config['placeholder'] || 'Select Date';
 }

 get inputValue(): string {
  return this.isMultiMode ? '' : (this.picker_params['value'] as string) ?? '';
 }

 private formatDate(date: any, format: string = this._config['format'] || 'DD/MM/YYYY'): string {
  if (!date) return '';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);
  const pad = (n: number) => n.toString().padStart(2, '0');
  const map: Record<string, string> = {
   YYYY: d.getFullYear().toString(),
   MM: pad(d.getMonth() + 1),
   DD: pad(d.getDate()),
  };
  return format.replace(/YYYY|MM|DD/g, (token) => map[token]);
 }
}
