export const truncate = (text: string, max = 110) => {
    const clean = text.replace(/\s+/g, " ").trim()
    if (clean.length <= max) return clean
    return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`
};
