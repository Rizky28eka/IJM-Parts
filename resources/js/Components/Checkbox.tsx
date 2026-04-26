import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-red-600 shadow-sm focus:ring-red-500 ' +
                className
            }
        />
    );
}
