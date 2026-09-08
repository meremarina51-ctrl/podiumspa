import { Check } from "lucide-react"
import type { InputHTMLAttributes, ReactNode } from "react"

type IProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
    label: ReactNode
}

export const Checkbox = ({ label, id, ...props }: IProps) => (
    <label htmlFor={id} className="flex items-start gap-2.5">
        <span className="relative mt-0.5 flex size-4.5 shrink-0 items-center justify-center">
            <input
                type="checkbox"
                id={id}
                className="peer absolute inset-0 size-4.5 cursor-pointer appearance-none rounded-[5px] border-[1.5px] border-foreground/30 bg-transparent transition-colors checked:border-accent checked:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/50"
                {...props}
            />
            <Check strokeWidth={3} className="pointer-events-none relative size-3 text-foreground opacity-0 transition-opacity peer-checked:opacity-100" />
        </span>
        <span className="text-xs leading-relaxed text-foreground-faint">{label}</span>
    </label>
);
