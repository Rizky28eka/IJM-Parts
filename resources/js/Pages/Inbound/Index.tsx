import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { PageProps } from '@/types';

interface Inbound {
    id: number;
    invoice_number: string | null;
    date: string;
    notes: string | null;
    supplier: string;
    user: string;
    total_items: number;
    total_qty: number;
}

interface Props {
    inbounds: Inbound[];
    flash?: { success?: string };
}

export default function Index({ inbounds, flash }: Props) {
    const { auth } = usePage<PageProps>().props;

    const handleDelete = (id: number) => {
        if (confirm('Batalkan transaksi ini? Stok akan di-rollback secara otomatis.')) {
            router.delete(route('inbounds.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                        Transaksi <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Barang Masuk</span>
                    </h2>
                    <Link
                        href={route('inbounds.create')}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/20 hover:bg-red-500 hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Catat Masuk
                    </Link>
                </div>
            }
        >
            <Head title="Barang Masuk" />

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
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">Log Transaksi</h3>
                                <p className="text-sm text-gray-400 dark:text-zinc-600 font-bold mt-1">{inbounds.length} Record Ditemukan</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/30 dark:bg-zinc-900/30 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                                        <th className="px-8 py-5">TANGGAL</th>
                                        <th className="px-8 py-5">NO. FAKTUR</th>
                                        <th className="px-8 py-5">SUPPLIER</th>
                                        <th className="px-8 py-5 text-center">ITEM</th>
                                        <th className="px-8 py-5 text-center">QTY</th>
                                        <th className="px-8 py-4 text-right">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900/50">
                                    {inbounds.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-20 text-center text-gray-500 dark:text-zinc-600">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="p-4 rounded-full bg-gray-100 dark:bg-zinc-800">
                                                       <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs font-black uppercase tracking-widest">Belum ada riwayat masuk</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        inbounds.map((inbound) => (
                                            <tr key={inbound.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors group">
                                                <td className="px-8 py-4 font-black text-gray-900 dark:text-white whitespace-nowrap">
                                                    {new Date(inbound.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </td>
                                                <td className="px-8 py-4 text-gray-500 dark:text-zinc-500 font-mono text-xs uppercase tracking-tight">
                                                    {inbound.invoice_number ?? 'NON-FAKTUR'}
                                                </td>
                                                <td className="px-8 py-4 text-gray-800 dark:text-zinc-200 font-bold uppercase text-xs">{inbound.supplier}</td>
                                                <td className="px-8 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center min-w-[2rem] h-8 rounded-xl bg-blue-500/10 text-blue-500 font-black text-[10px]">
                                                        {inbound.total_items}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center px-4 py-1 rounded-xl bg-emerald-500/10 text-emerald-500 font-black text-[10px]">
                                                        +{inbound.total_qty}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <Link
                                                            href={route('inbounds.show', inbound.id)}
                                                            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
                                                        >
                                                            Detail
                                                        </Link>
                                                        {auth.user.role === 'owner' && (
                                                            <button
                                                                onClick={() => handleDelete(inbound.id)}
                                                                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-500/20"
                                                            >
                                                                Batal
                                                            </button>
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
