/**
 * Represents the mode of a date picker component.
 * - 'DatePicker' → single date selection.
 * - 'MultiDatePicker' → allows selecting multiple dates.
 */
export type PickerMode = 'DatePicker' | 'MultiDatePicker';

/**
 * Represents the minimum selectable date in the date picker.
 * - Should be an ISO date string (e.g., '2026-02-19').
 * - Can be `undefined` if no minimum date restriction is applied.
 */
export type MinDate = string | undefined;

/**
 * Represents the maximum selectable date in the date picker.
 * - Should be an ISO date string (e.g., '2026-12-31').
 * - Can be `undefined` if no maximum date restriction is applied.
 */
export type MaxDate = string | undefined;
