import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface Adjustment {
    id: number;
    part: {
        id: number;
        name: string;
        sku: string;
        unit: string;
    };
    user: {
        name: string;
    };
    date: string;
    system_qty: number;
    physical_qty: number;
    discrepancy: number;
    reason: string | null;
}

interface Props {
    adjustments: Adjustment[];
    flash: { success?: string };
}

export default function Index({ adjustments, flash }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                        Riwayat <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Stock Opname</span>
                    </h2>
                    <Link
                        href={route('stock-adjustments.create')}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/20 hover:bg-red-500 hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Buat Opname
                    </Link>
                </div>
            }
        >
            <Head title="Stock Opname" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    {flash?.success && (
                        <div className="flex items-center gap-3 rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 px-5 py-4 text-green-700 dark:text-green-400 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-500">
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {flash.success}
                        </div>
                    )}

                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2rem] border border-gray-200 dark:border-zinc-800 transition-colors">
                        <div className="flex items-center justify-between p-8 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">Log Penyesuaian Stok</h3>
                                <p className="text-sm text-gray-400 dark:text-zinc-600 font-bold mt-1">{adjustments.length} Record Opname</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/30 dark:bg-zinc-900/30 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                                        <th className="px-8 py-5">TANGGAL</th>
                                        <th className="px-8 py-5">SUKU CADANG</th>
                                        <th className="px-8 py-5 text-center">SISTEM</th>
                                        <th className="px-8 py-5 text-center">FISIK</th>
                                        <th className="px-8 py-5 text-center">SELISIH</th>
                                        <th className="px-8 py-5">ALASAN</th>
                                        <th className="px-8 py-4 text-right">PETUGAS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900/50">
                                    {adjustments.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-8 py-20 text-center text-gray-500 dark:text-zinc-600">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="p-4 rounded-full bg-gray-100 dark:bg-zinc-800">
                                                        <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs font-black uppercase tracking-widest">Belum ada riwayat opname</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        adjustments.map((adj) => (
                                            <tr key={adj.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors group">
                                                <td className="px-8 py-4 font-black text-gray-900 dark:text-white whitespace-nowrap">
                                                    {new Date(adj.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </td>
                                                <td className="px-8 py-4 overflow-hidden truncate max-w-[200px]">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-900 dark:text-white uppercase text-xs">{adj.part.name}</span>
                                                        <span className="text-[10px] font-black uppercase text-gray-400 dark:text-zinc-600 tracking-widest">{adj.part.sku}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4 text-center font-bold text-gray-500 dark:text-zinc-500">
                                                    {adj.system_qty}
                                                </td>
                                                <td className="px-8 py-4 text-center font-black text-gray-900 dark:text-white">
                                                    {adj.physical_qty}
                                                </td>
                                                <td className="px-8 py-4 text-center">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black tracking-widest border ${
                                                        adj.discrepancy === 0 
                                                            ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                            : adj.discrepancy > 0
                                                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                                                    }`}>
                                                        {adj.discrepancy > 0 ? '+' : ''}{adj.discrepancy}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-4 text-gray-600 dark:text-zinc-400 italic text-[11px] max-w-xs truncate">
                                                    {adj.reason ?? '—'}
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-bold text-[10px] uppercase tracking-tight">
                                                        {adj.user.name}
                                                    </span>
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
