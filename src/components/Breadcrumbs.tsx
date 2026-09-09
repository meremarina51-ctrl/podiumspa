import Link from "next/link"

interface IProps {
    current: string
}

export const Breadcrumbs = ({ current }: IProps) => (
    <div className="mx-auto flex w-full max-w-340 items-center gap-2 px-6 pt-6 text-[12.5px] text-foreground-faint md:px-14">
        <Link href="/" className="transition-colors duration-200 hover:text-foreground">
            Podium
        </Link>
        <span>/</span>
        <span className="text-foreground-muted">{current}</span>
    </div>
);
