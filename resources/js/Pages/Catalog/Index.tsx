import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Part {
    id: number;
    sku: string;
    name: string;
    category: { name: string };
    brand: { name: string };
    stock: number;
    unit: string;
    location: string;
}

interface Props {
    parts: Part[];
}

export default function Index({ parts }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Katalog <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Persediaan Stok</span>
                </h2>
            }
        >
            <Head title="Katalog Stok" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl shadow-gray-200/50 dark:shadow-none sm:rounded-[2rem] border border-gray-200 dark:border-zinc-800 transition-colors duration-300">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
                                <thead className="bg-gray-50 dark:bg-[#0c0c0e]">
                                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">
                                        <th className="px-6 py-5 text-left">SKU & NAMA</th>
                                        <th className="px-6 py-5 text-left">KLASIFIKASI</th>
                                        <th className="px-6 py-5 text-left">STOK TERSEDIA</th>
                                        <th className="px-6 py-5 text-left">LOKASI GUDANG</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900/50">
                                    {parts.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-20 text-center">
                                                <div className="text-gray-400 dark:text-zinc-600 text-xs font-black uppercase tracking-[0.2em]">Katalog Belum Tersedia</div>
                                            </td>
                                        </tr>
                                    ) : (
                                        parts.map((part) => (
                                            <tr key={part.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-black text-gray-900 dark:text-white group-hover:text-red-500 transition-colors uppercase">{part.sku}</div>
                                                    <div className="text-xs text-gray-500 dark:text-zinc-500 font-medium uppercase">{part.name}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-700 dark:text-zinc-300 font-bold">{part.category.name}</div>
                                                    <div className="text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-tighter">{part.brand.name}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-[10px] font-black uppercase tracking-widest border border-zinc-200 dark:border-zinc-700">
                                                        {part.stock} {part.unit}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-mono text-gray-600 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-lg border border-gray-200 dark:border-zinc-700">
                                                        {part.location || '—'}
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
