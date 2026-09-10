export const formatDate = (iso: string, locale: string = "ru") =>
    new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "ru-RU", { day: "numeric", month: "long", year: "numeric" });
