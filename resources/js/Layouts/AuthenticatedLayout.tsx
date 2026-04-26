import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { useTheme } from '@/Contexts/ThemeProvider';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-[#09090b] text-gray-900 dark:text-zinc-300 overflow-hidden transition-colors duration-300">
            {/* Mobile sidebar backdrop */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-16 items-center border-b border-gray-200 dark:border-zinc-800 px-6">
                    <Link href="/" className="flex items-center gap-2 group w-full">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600 shadow-lg shadow-red-600/30 group-hover:bg-red-500 transition-colors">
                            <ApplicationLogo className="block h-5 w-auto fill-current text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tighter text-gray-900 dark:text-white uppercase truncate">
                            IJM <span className="text-red-500">Parts</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex flex-col gap-1 p-4 overflow-y-auto h-[calc(100vh-4rem)]">
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="flex items-center rounded-xl px-4 py-3"
                    >
                        <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </NavLink>
                    
                    {user.role === 'karyawan' ? (
                        <>
                            <div className="mt-4 mb-2 px-4 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600">Layanan Karyawan</div>
                            <NavLink
                                href={route('catalog.index')}
                                active={route().current('catalog.*')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Katalog Stok
                            </NavLink>
                            <NavLink
                                href={route('part-requests.create')}
                                active={route().current('part-requests.create')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" shadow-box="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Request Barang
                            </NavLink>
                            <NavLink
                                href={route('part-requests.index')}
                                active={route().current('part-requests.index')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Riwayat Saya
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <div className="mt-4 mb-2 px-4 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600">Inventory & Aset</div>
                            
                            <NavLink
                                href={route('parts.index')}
                                active={route().current('parts.*')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Suku Cadang
                            </NavLink>
                            <NavLink
                                href={route('categories.index')}
                                active={route().current('categories.*')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Kategori
                            </NavLink>
                            <NavLink
                                href={route('brands.index')}
                                active={route().current('brands.*')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Merk Part
                            </NavLink>

                            <div className="mt-4 mb-2 px-4 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600">Transaksi Stok</div>

                            <NavLink
                                href={route('part-requests.index')}
                                active={route().current('part-requests.*')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                Permintaan Barang
                            </NavLink>
                            <NavLink
                                href={route('inbounds.index')}
                                active={route().current('inbounds.*')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                Barang Masuk
                            </NavLink>
                            <NavLink
                                href={route('outbounds.index')}
                                active={route().current('outbounds.*')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Barang Keluar
                            </NavLink>
                            <NavLink
                                href={route('stock-adjustments.index')}
                                active={route().current('stock-adjustments.*')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                Stock Opname
                            </NavLink>
                            {user.role === 'owner' && (
                                <>
                                    <NavLink
                                        href={route('reports.index')}
                                        active={route().current('reports.*')}
                                        className="flex items-center rounded-xl px-4 py-3"
                                    >
                                        <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4m0 0l-4-4m4 4l-4 4m6 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2" />
                                        </svg>
                                        Laporan & Export
                                    </NavLink>
                                    <div className="mt-4 mb-2 px-4 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600">Admin & Sistem</div>
                                    <NavLink
                                        href={route('users.index')}
                                        active={route().current('users.*')}
                                        className="flex items-center rounded-xl px-4 py-3"
                                    >
                                        <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        Manajemen Pengguna
                                    </NavLink>
                                </>
                            )}

                            <div className="mt-4 mb-2 px-4 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600">Mitra & SDM</div>

                            <NavLink
                                href={route('suppliers.index')}
                                active={route().current('suppliers.*')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Supplier
                            </NavLink>
                            <NavLink
                                href={route('mechanics.index')}
                                active={route().current('mechanics.*')}
                                className="flex items-center rounded-xl px-4 py-3"
                            >
                                <svg className="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Mekanik
                            </NavLink>
                        </>
                    )}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col">
                {/* Topbar */}
                <header className="relative z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 dark:text-zinc-500 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-700 dark:hover:text-zinc-400 focus:bg-gray-100 dark:focus:bg-zinc-900 focus:text-gray-700 dark:focus:text-zinc-400 focus:outline-none lg:hidden"
                    >
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Page Header (if provided, usually Title) */}
                    <div className="flex-1 ml-4 lg:ml-0 overflow-hidden text-ellipsis whitespace-nowrap">
                        {header && (
                           <div className="truncate">
                               {header}
                           </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                        
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 p-1 pr-3 text-sm font-medium leading-4 text-gray-500 dark:text-zinc-400 transition hover:text-gray-700 dark:hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-500 font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="hidden sm:inline-block max-w-[100px] truncate">{user.name}</span>
                                    <svg className="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Pengaturan Profil
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Keluar
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Main Content scrollable area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-[#09090b] transition-colors duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
}
