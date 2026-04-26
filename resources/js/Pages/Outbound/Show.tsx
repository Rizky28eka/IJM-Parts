import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

interface OutboundDetail {
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

interface OutboundData {
    id: number;
    reference_number: string | null;
    date: string;
    type: "sales" | "service" | "scrap";
    license_plate: string | null;
    notes: string | null;
    mechanic: { name: string } | null;
    user: { name: string };
    details: OutboundDetail[];
}

interface Props {
    outbound: OutboundData;
}

const TYPE_CONFIG = {
    sales: {
        label: "Penjualan Langsung",
        color: "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20",
    },
    service: {
        label: "Pemakaian Servis",
        color: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20",
    },
    scrap: {
        label: "Barang Rusak/Retur",
        color: "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20",
    },
};

export default function Show({ outbound }: Props) {
    const totalQty = outbound.details.reduce((sum, d) => sum + d.quantity, 0);
    const typeConf = TYPE_CONFIG[outbound.type];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Detail{" "}
                    <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">
                        Barang Keluar
                    </span>
                </h2>
            }
        >
            <Head title={`Barang Keluar #${outbound.id}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 space-y-6">
                    {/* Header Card */}
                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-3xl border border-gray-200 dark:border-zinc-800 transition-colors">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Nota Pengeluaran #
                                    {String(outbound.id).padStart(5, "0")}
                                </h3>
                                {outbound.reference_number && (
                                    <p className="text-sm text-gray-500 dark:text-zinc-500 font-mono mt-0.5">
                                        Ref: {outbound.reference_number}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${typeConf.color}`}
                                >
                                    {typeConf.label}
                                </span>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">
                                    {new Date(outbound.date).toLocaleDateString(
                                        "id-ID",
                                        {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        },
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600 mb-1">
                                    Dicatat Oleh
                                </p>
                                <p className="font-bold text-gray-900 dark:text-white">
                                    {outbound.user.name}
                                </p>
                            </div>
                            {outbound.mechanic && (
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600 mb-1">
                                        Mekanik
                                    </p>
                                    <p className="font-bold text-gray-900 dark:text-white">
                                        {outbound.mechanic.name}
                                    </p>
                                </div>
                            )}
                            {outbound.license_plate && (
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600 mb-1">
                                        No. Plat
                                    </p>
                                    <p className="font-bold text-red-600">
                                        {outbound.license_plate}
                                    </p>
                                </div>
                            )}
                            {outbound.notes && (
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600 mb-1">
                                        Catatan
                                    </p>
                                    <p className="text-gray-700 dark:text-zinc-300 text-sm">
                                        {outbound.notes}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-3xl border border-gray-200 dark:border-zinc-800 transition-colors">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800">
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                Daftar Barang Keluar
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 text-left text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-600">
                                        <th className="px-6 py-4">SKU</th>
                                        <th className="px-6 py-4">
                                            Nama Barang
                                        </th>
                                        <th className="px-6 py-4">Kategori</th>
                                        <th className="px-6 py-4">Merek</th>
                                        <th className="px-6 py-4 text-right">
                                            Jumlah Keluar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                                    {outbound.details.map((detail) => (
                                        <tr
                                            key={detail.id}
                                            className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500 dark:text-zinc-500">
                                                {detail.part.sku}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {detail.part.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-zinc-400">
                                                {detail.part.category?.name ??
                                                    "—"}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-zinc-400">
                                                {detail.part.brand?.name ?? "—"}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-xs">
                                                    -{detail.quantity}{" "}
                                                    {detail.part.unit}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/50">
                                        <td
                                            colSpan={4}
                                            className="px-6 py-4 font-black text-gray-900 dark:text-white text-right uppercase tracking-widest text-xs"
                                        >
                                            Total Qty Keluar
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 font-black text-sm">
                                                -{totalQty}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <Link
                        href={route("outbounds.index")}
                        className="inline-block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors"
                    >
                        ← Kembali ke Riwayat
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
