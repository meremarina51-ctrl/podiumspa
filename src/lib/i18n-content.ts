export type Locale = "ru" | "en";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export const pick = (text: LocalizedText, locale: string): string => text[locale as Locale] ?? text.ru;

export const pickList = (list: LocalizedList, locale: string): string[] => list[locale as Locale] ?? list.ru;
