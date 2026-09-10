export const parseTiers = (price: string) =>
    price
        .split("\n")
        .map((part) => {
            const match = part.match(/([\d\s]+)\s*₽\s*·\s*(\d+)\s*(?:мин|min)/)
            if (!match) return null
            return { price: Number(match[1].replace(/\s/g, "")), duration: Number(match[2]) }
        })
        .filter((tier): tier is { price: number; duration: number } => tier !== null);
