import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Injector, Input, OnInit, Output } from "@angular/core"
import { ControlValueAccessor, FormControlDirective, FormControlName, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { RoundedType, SizeType, ValidationErrorType } from "../component.interface"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Configuration for the text field component.
 * Supports both template-driven and reactive forms via ControlValueAccessor.
 */
export interface TextFieldConfig {
 /** Visual size: sm | md | lg | '' */
 size?: SizeType
 /** Visual size: none | sm | md | lg | full */
 rounded?: RoundedType
 /** Input type for validation and keyboard */
 type?: "text" | "email" | "number" | "tel"
 /** Label shown above the input */
 label?: string
 /** Placeholder when empty */
 placeholder?: string
 /** Hint text shown when valid (below input) */
 helperText?: string
 /** Custom error message (overrides default per errorType) */
 errorText?: string
 /** Show required asterisk and validate presence */
 required?: boolean
 /** Read-only, no edits */
 readonly?: boolean
 /** Disabled state (form + config) */
 disabled?: boolean
 /** Show clear button inside input */
 clearInput?: boolean
 /** Min length for validation */
 minlength?: number
 /** Max length for validation */
 maxlength?: number
 /** Validation pattern (string or RegExp) */
 regexPattern?: string | RegExp
 /** Skip Error */
 skipError?: boolean
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_CONFIG: TextFieldConfig = {
 type: "text",
 required: false,
 readonly: false,
 disabled: false,
 clearInput: false,
 skipError: false
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Reusable text field component with label, validation, and form integration.
 * Works with both reactive (FormControl) and template-driven forms.
 */
@Component({
 selector: "lib-textfield",
 standalone: true,
 templateUrl: "./textfield.html",
 imports: [CommonModule],
 providers: [
  {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => TextFieldLib),
   multi: true
  }
 ],
 changeDetection: ChangeDetectionStrategy.OnPush,
 host: {
  "[attr.size]": "config.size",
  "[attr.rounded]": "config.rounded"
 }
})
export class TextFieldLib implements ControlValueAccessor, OnInit {
 // --- Dependency injection ---
 private cd = inject(ChangeDetectorRef)
 private injector = inject(Injector)

 /** Resolved NgControl when used inside a form (FormControlName / FormControlDirective). */
 ngControl: NgControl | null = null

 ngOnInit(): void {
  // Resolve NgControl so we can read validation state from reactive forms.
  this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true })
 }

 // --- Internal state ---
 /** Current input value (synced with form when used as ControlValueAccessor). */
 value = ""
 /** True while the input has focus (for focus styling). */
 isFocus = false
 /** True after the user has focused and blurred at least once (for showing errors only after interaction). */
 private hasBeenTouched = false
 /** Disabled state set by forms API (setDisabledState). */
 private internalDisabled = false
 /** Compiled regex from config.regexPattern for manual validation. */
 private pattern?: RegExp
 private _config: TextFieldConfig = DEFAULT_CONFIG

 // --- Inputs ---

 /** Merges with defaults and re-compiles regex when config changes. */
 @Input() set config(value: TextFieldConfig | null | undefined) {
  this._config = { ...DEFAULT_CONFIG, ...(value ?? {}) }
  this.resolvePattern()
  this.cd.markForCheck()
 }

 // --- Outputs ---
 @Output() blurEmitter = new EventEmitter<void>()

 // --- Getters ---

 get config(): TextFieldConfig {
  return this._config
 }

 /** Disabled if set via config or by form (setDisabledState). */
 get disabled(): boolean {
  return this.internalDisabled || !!this._config.disabled
 }

 /** CSS classes for the native input wrapper: focus, error. */
 get classes(): string {
  return [
   this.isFocus && !this.isInvalid ? "focus" : undefined,
   this.isInvalid ? "error" : undefined
  ].filter(Boolean).join(" ")
 }

 /** True when this field is bound to a reactive form control. */
 get isReactiveControl(): boolean {
  return this.ngControl instanceof FormControlName || this.ngControl instanceof FormControlDirective
 }

 /** Current validation error type from reactive control or manual validation. */
 get errorType(): ValidationErrorType {
  if (this.isReactiveControl) {
   const errors = this.ngControl?.control?.errors
   if (errors) {
    if (errors["required"]) return "required"
    if (errors["minlength"]) return "minlength"
    if (errors["maxlength"]) return "maxlength"
    if (errors["pattern"]) return "pattern"
   }
   return ""
  }
  return this.getManualError()
 }

 /** True when the field should show error state (invalid and touched/dirty or manual error). */
 get isInvalid(): boolean {
  if (this.isReactiveControl) {
   const control = this.ngControl?.control
   return !!control && control.invalid && (control.touched || control.dirty)
  }
  return this.hasBeenTouched && !!this.errorType
 }

 // --- ControlValueAccessor (form integration) ---

 onChange: (value: string) => void = () => { }
 onTouched: () => void = () => { }

 writeValue(value: string | null): void {
  this.value = value ?? ""
  this.cd.markForCheck()
 }

 registerOnChange(fn: (value: string) => void): void {
  this.onChange = fn
 }

 registerOnTouched(fn: () => void): void {
  this.onTouched = fn
 }

 setDisabledState(disabled: boolean): void {
  this.internalDisabled = disabled
  this.cd.markForCheck()
 }

 // --- Input events ---

 /** Handles native input events: updates value and notifies form. */
 handleInput(event: Event): void {
  if (this.disabled) return
  const target = event.target as HTMLInputElement
  const value = target.value ?? ""
  this.value = value
  this.onChange(value)
  this.cd.markForCheck()
 }

 /** Handles input blur: clears focus, marks as touched, notifies form and blur emitter. */
 handleBlur(): void {
  if (this.disabled) return
  this.isFocus = false
  this.hasBeenTouched = true
  this.onTouched()
  this.blurEmitter.emit()
  this.cd.markForCheck()
 }

 /** Handles input focus: sets focus state for styling. */
 onFocus(): void {
  if (this.disabled) return
  this.isFocus = true
  this.cd.markForCheck()
 }

 // --- Validation (when not using reactive forms) ---

 /** Returns the current error type based on config and value (no FormControl). */
 private getManualError(): ValidationErrorType {
  const v = this.value
  const c = this._config

  if (c.skipError) return ""

  if (c.required && !v) return "required"
  if (c.minlength != null && v.length < c.minlength) return "minlength"
  if (c.maxlength != null && v.length > c.maxlength) return "maxlength"
  if (this.pattern && v && !this.pattern.test(v)) return "pattern"
  return ""
 }

 /** Builds RegExp from config.regexPattern (string or RegExp). */
 private resolvePattern(): void {
  const p = this._config.regexPattern
  if (!p) {
   this.pattern = undefined
   return
  }
  this.pattern = typeof p === "string" ? new RegExp(p) : p
 }
}