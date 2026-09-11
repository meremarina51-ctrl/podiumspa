import type { LocalizedText } from "@/lib/i18n-content"
import { ROUTES } from "@/lib/routes"

export const phone = "+7 912 076-80-78"
export const placeholderPhone = "+79120768078"

export const address: LocalizedText = {
    ru: "Москва, ул.Большая Молчановка 18 (м. Арбатская, м. Киевская)",
    en: "Moscow, Bolshaya Molchanovka St. 18 (Arbatskaya, Kievskaya)",
    zh: "莫斯科，大莫尔恰诺夫卡街18号（阿尔巴茨卡亚站、基辅斯卡亚站）",
}

export const hours: LocalizedText[] = [
    { ru: "Вс—Чт · 13:00-7:00", en: "Sun—Thu · 1:00 PM-7:00 AM", zh: "周日至周四 · 13:00-次日7:00" },
    { ru: "Пт—Сб · 24 часа", en: "Fri—Sat · 24 hours", zh: "周五至周六 · 24小时营业" },
]

export const NAV_LABELS = {
    programs: { ru: "Программы", en: "Programs", zh: "项目" },
    staff: { ru: "Девушки", en: "Girls", zh: "女孩" },
    promo: { ru: "Акции", en: "Promotions", zh: "优惠活动" },
    interior: { ru: "Интерьер", en: "Interior", zh: "内部环境" },
    contacts: { ru: "Контакты", en: "Contacts", zh: "联系方式" },
    blog: { ru: "Блог", en: "Blog", zh: "博客" },
    vacancy: { ru: "Вакансии", en: "Careers", zh: "招聘" },
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
    { ru: "Искушение", en: "Temptation", zh: "诱惑" },
    { ru: "Тайский Боди Массаж", en: "Thai Body Massage", zh: "泰式身体按摩" },
    { ru: "Королевство Сиам", en: "Kingdom of Siam", zh: "暹罗王国" },
    { ru: "Сладкий персик", en: "Sweet Peach", zh: "甜蜜蜜桃" },
];
