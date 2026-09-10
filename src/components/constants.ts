import type { LocalizedText } from "@/lib/i18n-content"
import { ROUTES } from "@/lib/routes"

export const phone = "+7 912 076-80-78"
export const placeholderPhone = "+79120768078"

export const address: LocalizedText = {
    ru: "Москва, ул.Большая Молчановка 18 (м. Арбатская, м. Киевская)",
    en: "Moscow, Bolshaya Molchanovka St. 18 (Arbatskaya, Kievskaya)",
}

export const hours: LocalizedText[] = [
    { ru: "Вс—Чт · 13:00-7:00", en: "Sun—Thu · 1:00 PM-7:00 AM" },
    { ru: "Пт—Сб · 24 часа", en: "Fri—Sat · 24 hours" },
]

export const NAV_LABELS = {
    programs: { ru: "Программы", en: "Programs" },
    staff: { ru: "Девушки", en: "Girls" },
    promo: { ru: "Акции", en: "Promotions" },
    interior: { ru: "Интерьер", en: "Interior" },
    contacts: { ru: "Контакты", en: "Contacts" },
    blog: { ru: "Блог", en: "Blog" },
    vacancy: { ru: "Вакансии", en: "Careers" },
} satisfies Record<string, LocalizedText>

export const LEFT_NAV_ITEMS = [
    { name: NAV_LABELS.programs, href: ROUTES.PROGRAMS },
    { name: NAV_LABELS.staff, href: ROUTES.STAFF },
    { name: NAV_LABELS.promo, href: ROUTES.PROMO },
];

export const RIGHT_NAV_ITEMS = [
    { name: NAV_LABELS.interior, href: ROUTES.INTERIOR },
    { name: NAV_LABELS.contacts, href: ROUTES.CONTACTS },
    { name: NAV_LABELS.blog, href: ROUTES.BLOG },
];

export const ALL_NAV_ITEMS = [...LEFT_NAV_ITEMS, ...RIGHT_NAV_ITEMS];

export const PROGRAMS: LocalizedText[] = [
    { ru: "Искушение", en: "Temptation" },
    { ru: "Тайский Боди Массаж", en: "Thai Body Massage" },
    { ru: "Королевство Сиам", en: "Kingdom of Siam" },
    { ru: "Сладкий персик", en: "Sweet Peach" },
];
