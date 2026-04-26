import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Mechanic {
    id: number;
    name: string;
    phone: string;
}

interface Props {
    mechanics: Mechanic[];
}

export default function Index({ mechanics }: Props) {
    const { auth } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                        SDM <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Mekanik</span>
                    </h2>
                    <Link
                        href={route('mechanics.create')}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/20 hover:bg-red-500 hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Tambah Mekanik
                    </Link>
                </div>
            }
        >
            <Head title="Mekanik" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2rem] border border-gray-200 dark:border-zinc-800 transition-colors duration-300">
                        <div className="p-0">
                            <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
                                <thead className="bg-gray-50 dark:bg-[#0c0c0e]">
                                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">
                                        <th className="px-6 py-5 text-left">IDENTITAS MEKANIK</th>
                                        <th className="px-6 py-5 text-left">SALURAN KOMUNIKASI</th>
                                        <th className="px-6 py-5 text-right">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900/50">
                                    {mechanics.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-20 text-center">
                                                <div className="text-gray-400 dark:text-zinc-600 text-xs font-black uppercase tracking-[0.2em]">Belum Ada Mekanik Terdaftar</div>
                                            </td>
                                        </tr>
                                    ) : (
                                        mechanics.map((mechanic) => (
                                            <tr key={mechanic.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-black text-gray-900 dark:text-white group-hover:text-red-500 transition-colors tracking-tight uppercase">
                                                        {mechanic.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">
                                                        {mechanic.phone}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-3">
                                                        <Link
                                                            href={route('mechanics.edit', mechanic.id)}
                                                            className="text-gray-400 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </Link>
                                                        {auth.user.role === 'owner' && (
                                                            <Link
                                                                href={route('mechanics.destroy', mechanic.id)}
                                                                method="delete"
                                                                as="button"
                                                                className="text-gray-400 dark:text-zinc-600 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                                                                title="Hapus"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </Link>
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
