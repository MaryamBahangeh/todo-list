import { DropdownOption } from "../models/dropdown-option.ts";

export const NOTE_TYPE_DROPDOWN_OPTIONS: DropdownOption[] = [
  { value: "all", translationKey: "filters.noteType.all" },
  { value: "complete", translationKey: "filters.noteType.complete" },
  { value: "incomplete", translationKey: "filters.noteType.incomplete" },
];

export const LANGUAGE_DROPDOWN_OPTIONS: DropdownOption[] = [
  { value: "en", translationKey: "filters.languages.en" },
  { value: "fa", translationKey: "filters.languages.fa" },
];
