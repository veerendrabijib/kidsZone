/**
 * Shared types for lib components: color variants, validation error keys, option key mapping.
 */
export type ColorType = "primary" | "secondary" | "tertiary" | "warning" | "success" | "danger";

export type ValidationErrorType = "" | "required" | "minlength" | "maxlength" | "pattern";

export type SizeType = "sm" | "md" | "lg"

export type RoundedType = "none" | "sm" | "md" | "lg" | "full"

export interface OptionKeys {
 labelKey: string;
 valueKey: string;
}