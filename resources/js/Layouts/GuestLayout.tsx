import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-50 dark:bg-[#09090b] pt-6 sm:justify-center sm:pt-0 transition-colors duration-300"
            style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(128,128,128,0.1) 1px, transparent 0)`,
                backgroundSize: '28px 28px',
            }}
        >
            <div className="mb-2">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/30 group-hover:bg-red-500 transition-colors">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-black tracking-tight text-gray-900 dark:text-white">IJM<span className="text-red-500">Parts</span></div>
                        <div className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 dark:text-zinc-600">Parts Management System</div>
                    </div>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-gray-200 dark:border-zinc-800 px-8 py-8 shadow-2xl sm:max-w-md sm:rounded-3xl transition-colors duration-300">
                {children}
            </div>
        </div>
    );
}
