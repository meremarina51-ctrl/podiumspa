import { Crown, Gift, Heart, Infinity, Martini } from "lucide-react";

export const WHATSAPP_HREF = 'https://wa.me/79374338034';
export const EMAIL = 'm7441@yandex.ru';

export const VIDEOS = [
    "/home/about/podium-part-5.mp4",
    "/home/about/untitled.mp4",
    "/home/about/img_3602.mov",
]

export const POINTS = [
    "Во-первых, у нас собраны совершенно разные типажи. А это значит, любой гость найдёт здесь спутницу себе под стать.",
    "Во-вторых, все они — профессионалки своего дела. Обучение и опыт позволяют им находить подход даже к самому избалованному мужчине.",
    "В-третьих, они умеют не только работать руками, но и слушать. Можете открыться нашим чаровницам — они сохранят все ваши секреты.",
]

export const PHOTOS = [
    "/home/interior/img_9281.jpg",
    "/home/interior/img_9282.jpg",
    "/home/interior/img_9284.jpg",
    "/home/interior/img_9291.jpg",
    "/home/interior/img_9294.jpg",
    "/home/interior/img_9296.jpg",
    "/home/interior/img_9297.jpg",
    "/home/interior/img_9300.jpg",
]

export const CATEGORY_ICONS = [Gift, Martini, Crown, Heart, Infinity]

export const PROMOS = [
    {
        title: "Счастливый билет!",
        description: "Беспроигрышная лотерея!",
        image: "/home/promo/pod_vbrmn_banner_long.png.webp",
    },
    {
        title: "Коктейльная вечеринка!",
        description: "Каждый четверг коктейльная вечеринка в Podium spa",
        image: "/home/promo/vecherinka-koktejlnaya-1.png.webp",
    },
    {
        title: "Мы рады не только мужчинам..",
        description: "Приятный бонус для милых дам!",
        image: "/home/promo/solyarij-1.png.webp",
    },
    {
        title: "Днем с огнем!",
        description: "Приятный бонус для любителей отдохнуть по будням",
        image: "/home/promo/vip-programmy.png.webp",
    },
    {
        title: "Двойной экстаз",
        description: "Специально для наших мужчин массаж  в 4 руки в подарок!",
        image: "/home/promo/lesbi.png.webp",
    },
]

export const QUESTIONS = [
    {
        key: "hairColor",
        title: "Предпочитаемый цвет волос?",
        options: ["Блондинка", "Брюнетка", "Рыжая", "Русая"],
    },
    {
        key: "breastSize",
        title: "Какой размер груди Вы предпочитаете?",
        options: ["1 - 1.5 (маленькая)", "2 - 3 (средняя)", "3.5 + (большая)"],
    },
    {
        key: "height",
        title: "Предпочитаемый рост?",
        options: ["150 - 160 см", "160 - 170 см", "170 - 180 см", "180 + см"],
    },
    {
        key: "bodyType",
        title: "Какое телосложение Вы предпочитаете?",
        options: ["Очень худая", "Стройная", "Спортивная", "Пухленькая"],
    },
    {
        key: "age",
        title: "Возраст",
        options: ["18 - 21", "22 - 25", "26 - 30", "Не имеет значения"],
    },
    {
        key: "location",
        title: "Где желаете отдохнуть?",
        options: ["У себя", "В салоне"],
    },
] as const

export const TOTAL_STEPS = QUESTIONS.length
export const CONTACT_STEP = TOTAL_STEPS + 1
export const SUCCESS_STEP = TOTAL_STEPS + 2

export const STEP_IMAGES = [
    "/home/quiz/choise-form-start.png.webp",
    "/home/quiz/choise-form-1.jpg.webp",
    "/home/quiz/choise-form-2.jpg.webp",
    "/home/quiz/choise-form-3.jpg.webp",
    "/home/quiz/choise-form-4.jpg.webp",
    "/home/quiz/choise-form-5.jpg.webp",
    "/home/quiz/choise-form-6.jpg.webp",
    "/home/quiz/choise-form-end.jpg.webp",
    "/home/quiz/choise-form-end.jpg.webp",
]


export const ADVANTAGES = [
    {
        text: "Каждый день работает не менее 15 девушек. Всего в штате 100 соблазнительных и профессиональных массажисток",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
                <path d="M3.5 20c0-3.3 2.5-5 5.5-5s5.5 1.7 5.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                <circle cx="17" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.7" />
                <path d="M14.8 20c.2-2.7 1.9-4.1 3.7-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        text: "Фотографии на сайте соответствуют действительности, вы всегда можете познакомиться с девушками «заочно»",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="7" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M8.5 7 10 4.5h4L15.5 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13.5" r="3.4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
    {
        text: "Широкий ассортимент программ позволяет выбрать сеанс на любой бюджет и любые предпочтения",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
                <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
                <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
                <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
    {
        text: "Салон предоставляет услуги на выезд без потери качества исполнения",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4.5 16V11l1.8-4.5h11.4L19.5 11v5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M4.5 13.5h15" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="7.8" cy="16.8" r="1.5" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="16.2" cy="16.8" r="1.5" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
    {
        text: "Удобное расположение салона позволит без труда добраться из любой части Москвы на общественном или личном транспорте",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11Z" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
    {
        text: "Апартаменты VIP-класса и высокий уровень обслуживания",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 17h16l-1.4-8-4.1 3.2L12 6l-2.5 6.2L5.4 9 4 17Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
        ),
    },
]