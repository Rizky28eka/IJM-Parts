import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Outbound {
    id: number;
    reference_number: string | null;
    date: string;
    type: 'sales' | 'service' | 'scrap';
    license_plate: string | null;
    notes: string | null;
    mechanic: string | null;
    user: string;
    total_items: number;
    total_qty: number;
}

interface Props {
    outbounds: Outbound[];
    flash?: { success?: string };
}

const TYPE_CONFIG = {
    sales:   { label: 'Penjualan Langsung', color: 'text-green-700 dark:text-green-400 bg-green-500/10 border-green-200 dark:border-green-500/20' },
    service: { label: 'Pemakaian Servis',   color: 'text-blue-700 dark:text-blue-400 bg-blue-500/10 border-blue-200 dark:border-blue-500/20'       },
    scrap:   { label: 'Rusak / Retur',     color: 'text-red-700 dark:text-red-400 bg-red-500/10 border-red-200 dark:border-red-500/20'             },
};

export default function Index({ outbounds, flash }: Props) {
    const { auth } = usePage<PageProps>().props;

    const handleDelete = (id: number) => {
        if (confirm('Batalkan transaksi ini? Stok akan dikembalikan ke gudang secara otomatis.')) {
            router.delete(route('outbounds.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                        Transaksi <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Barang Keluar</span>
                    </h2>
                    <Link
                        href={route('outbounds.create')}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/20 hover:bg-red-500 hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Catat Keluar
                    </Link>
                </div>
            }
        >
            <Head title="Barang Keluar" />

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
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">Log Pengeluaran</h3>
                                <p className="text-sm text-gray-400 dark:text-zinc-600 font-bold mt-1">{outbounds.length} Transaksi Tercatat</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/30 dark:bg-zinc-900/30 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                                        <th className="px-8 py-5">TANGGAL</th>
                                        <th className="px-8 py-5">REFERENSI</th>
                                        <th className="px-8 py-5 text-center">TIPE</th>
                                        <th className="px-8 py-5">MEKANIK</th>
                                        <th className="px-8 py-5 text-center">ITEM</th>
                                        <th className="px-8 py-5 text-center">QTY</th>
                                        <th className="px-8 py-4 text-right">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900/50">
                                    {outbounds.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-8 py-20 text-center text-gray-500 dark:text-zinc-600">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="p-4 rounded-full bg-gray-100 dark:bg-zinc-800">
                                                        <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs font-black uppercase tracking-widest">Belum ada riwayat keluar</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        outbounds.map((outbound) => {
                                            const typeConf = TYPE_CONFIG[outbound.type];
                                            return (
                                                <tr key={outbound.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors group">
                                                    <td className="px-8 py-4 font-black text-gray-900 dark:text-white whitespace-nowrap">
                                                        {new Date(outbound.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-8 py-4 text-gray-500 dark:text-zinc-500 font-mono text-xs uppercase tracking-tight">
                                                        <div>{outbound.reference_number ?? 'NON-REF'}</div>
                                                        {outbound.license_plate && (
                                                            <div className="text-[10px] text-red-500 font-black mt-1">
                                                                {outbound.license_plate}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-8 py-4 text-center">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${typeConf.color}`}>
                                                            {typeConf.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-4 text-gray-800 dark:text-zinc-200 font-bold uppercase text-[10px]">
                                                        {outbound.mechanic ?? <span className="text-gray-400 italic">—</span>}
                                                    </td>
                                                    <td className="px-8 py-4 text-center">
                                                        <span className="inline-flex items-center justify-center min-w-[2rem] h-8 rounded-xl bg-blue-500/10 text-blue-500 font-black text-[10px]">
                                                            {outbound.total_items}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-4 text-center">
                                                        <span className="inline-flex items-center justify-center px-4 py-1 rounded-xl bg-red-500/10 text-red-500 font-black text-[10px]">
                                                            -{outbound.total_qty}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <Link
                                                                href={route('outbounds.show', outbound.id)}
                                                                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
                                                            >
                                                                Detail
                                                            </Link>
                                                            {auth.user.role === 'owner' && (
                                                                <button
                                                                    onClick={() => handleDelete(outbound.id)}
                                                                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-500/20"
                                                                >
                                                                    Batal
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
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
