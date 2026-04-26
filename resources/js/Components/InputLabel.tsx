import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={
                `block text-xs font-black uppercase tracking-widest text-gray-700 dark:text-zinc-400 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
