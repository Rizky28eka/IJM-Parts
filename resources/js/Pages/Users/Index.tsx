import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at: string | null;
    is_active: boolean;
}

interface Props {
    users: User[];
}

export default function Index({ users }: Props) {
    const { auth } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                        Manajemen <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Pengguna</span>
                    </h2>
                    <Link
                        href={route('users.create')}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/20 hover:bg-red-500 hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Tambah Pengguna
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Pengguna" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2rem] border border-gray-200 dark:border-zinc-800 transition-colors duration-300">
                        <div className="p-0">
                            <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
                                <thead className="bg-gray-50 dark:bg-[#0c0c0e]">
                                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">
                                        <th className="px-6 py-5 text-left">NAMA PENGGUNA</th>
                                        <th className="px-6 py-5 text-left">EMAIL</th>
                                        <th className="px-6 py-5 text-left">HAK AKSES</th>
                                        <th className="px-6 py-5 text-left">STATUS</th>
                                        <th className="px-6 py-5 text-right">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900/50">
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-20 text-center">
                                                <div className="text-gray-400 dark:text-zinc-600 text-xs font-black uppercase tracking-[0.2em]">Belum Ada Pengguna Terdaftar</div>
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600/10 text-red-500 font-black text-xs">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div className="text-sm font-black text-gray-900 dark:text-white group-hover:text-red-500 transition-colors tracking-tight uppercase">
                                                            {user.name}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-600 dark:text-zinc-400 font-medium">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                        user.role === 'owner' 
                                                            ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                                                            : user.role === 'admin'
                                                                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                                : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-2">
                                                        {user.is_active ? (
                                                            <span className="inline-flex items-center text-[10px] font-bold text-green-500 uppercase tracking-widest">
                                                                <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                Aktif
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center text-[10px] font-bold text-red-500 uppercase tracking-widest">
                                                                <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                                </svg>
                                                                Nonaktif
                                                            </span>
                                                        )}
                                                        
                                                        {user.email_verified_at ? (
                                                            <span className="inline-flex items-center text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                                                                Email Terverifikasi
                                                            </span>
                                                        ) : (
                                                            <div className="flex flex-col gap-1 mt-1 border-t border-gray-100 dark:border-zinc-800 pt-1">
                                                                <span className="inline-flex items-center text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                                                                    Email Tertunda
                                                                </span>
                                                                {(auth.user.role === 'owner' || user.role !== 'owner') && (
                                                                    <Link
                                                                        href={route('users.verify', user.id)}
                                                                        method="patch"
                                                                        as="button"
                                                                        className="text-[9px] font-black uppercase tracking-tight text-red-500 hover:text-red-600 underline text-left"
                                                                    >
                                                                        Verifikasikan
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-3">
                                                        {(auth.user.role === 'owner' || user.role !== 'owner') && (
                                                            <Link
                                                                href={route('users.edit', user.id)}
                                                                className="text-gray-400 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                                                title="Edit"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </Link>
                                                        )}
                                                        {auth.user.id !== user.id && (auth.user.role === 'owner' || user.role !== 'owner') && (
                                                            <>
                                                                <Link
                                                                    href={route('users.toggle-status', user.id)}
                                                                    method="patch"
                                                                    as="button"
                                                                    className={`transition-colors ${user.is_active ? 'text-gray-400 dark:text-zinc-400 hover:text-amber-500' : 'text-gray-400 dark:text-zinc-600 hover:text-emerald-500'}`}
                                                                    title={user.is_active ? "Nonaktifkan" : "Aktifkan"}
                                                                >
                                                                    {user.is_active ? (
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                    )}
                                                                </Link>

                                                                <Link
                                                                    href={route('users.destroy', user.id)}
                                                                    method="delete"
                                                                    as="button"
                                                                    className="text-gray-400 dark:text-zinc-600 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                                                                    title="Hapus"
                                                                >
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                </Link>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
