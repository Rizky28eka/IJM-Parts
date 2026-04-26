import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface InboundDetail {
    id: number;
    quantity: number;
    part: {
        id: number;
        name: string;
        sku: string;
        unit: string;
        category?: { name: string };
        brand?: { name: string };
    };
}

interface InboundData {
    id: number;
    invoice_number: string | null;
    date: string;
    notes: string | null;
    supplier: { name: string; phone?: string };
    user: { name: string };
    details: InboundDetail[];
}

interface Props {
    inbound: InboundData;
}

export default function Show({ inbound }: Props) {
    const totalQty = inbound.details.reduce((sum, d) => sum + d.quantity, 0);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Detail <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Barang Masuk</span>
                </h2>
            }
        >
            <Head title={`Barang Masuk #${inbound.id}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 space-y-6">
                    {/* Nota Header */}
                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-3xl border border-gray-200 dark:border-zinc-800 transition-colors">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Nota Penerimaan #{String(inbound.id).padStart(5, '0')}
                                </h3>
                                {inbound.invoice_number && (
                                    <p className="text-sm text-gray-500 dark:text-zinc-500 font-mono mt-0.5">
                                        Faktur Supplier: {inbound.invoice_number}
                                    </p>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">
                                    {new Date(inbound.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-zinc-500">Dicatat oleh: {inbound.user.name}</p>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600 mb-1">Supplier</p>
                                <p className="font-bold text-gray-900 dark:text-white">{inbound.supplier.name}</p>
                            </div>
                            {inbound.notes && (
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600 mb-1">Catatan</p>
                                    <p className="text-gray-700 dark:text-zinc-300 text-sm">{inbound.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-3xl border border-gray-200 dark:border-zinc-800 transition-colors">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800">
                            <h3 className="font-bold text-gray-900 dark:text-white">Daftar Barang Diterima</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 text-left text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600">
                                        <th className="px-6 py-4">SKU</th>
                                        <th className="px-6 py-4">Nama Barang</th>
                                        <th className="px-6 py-4">Kategori</th>
                                        <th className="px-6 py-4">Merek</th>
                                        <th className="px-6 py-4 text-right">Jumlah Masuk</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                                    {inbound.details.map((detail) => (
                                        <tr key={detail.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500 dark:text-zinc-500">{detail.part.sku}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{detail.part.name}</td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-zinc-400">{detail.part.category?.name ?? '—'}</td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-zinc-400">{detail.part.brand?.name ?? '—'}</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 font-bold text-xs">
                                                    +{detail.quantity} {detail.part.unit}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/50">
                                        <td colSpan={4} className="px-6 py-4 font-black text-gray-900 dark:text-white text-right uppercase tracking-widest text-xs">
                                            Total Qty Masuk
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 font-black text-sm">
                                                +{totalQty}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <Link
                            href={route('inbounds.index')}
                            className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors"
                        >
                            ← Kembali ke Riwayat
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
