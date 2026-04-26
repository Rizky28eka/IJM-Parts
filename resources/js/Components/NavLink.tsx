import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'transition-all duration-300 ease-in-out text-sm font-medium focus:outline-none ' +
                (active
                    ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 font-bold '
                    : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white ') +
                className
            }
        >
            {children}
        </Link>
    );
}
