import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Index() {
    const [data, setData] = useState({
        type: "inventory",
        format: "csv",
        start_date: "",
        end_date: "",
    });

    const handleDownload = () => {
        const queryParams = new URLSearchParams(data as any).toString();
        window.location.href = route("reports.download") + "?" + queryParams;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Laporan{" "}
                    <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">
                        & Ekspor Data
                    </span>
                </h2>
            }
        >
            <Head title="Laporan & Ekspor" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <div className="bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 p-8 md:p-12 transition-all">
                        <div className="mb-10">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">
                                Pusat Laporan IJM
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">
                                Konfigurasi parameter ekspor data Anda
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Report Type */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    {
                                        id: "inventory",
                                        label: "Daftar Stok",
                                        icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                                    },
                                    {
                                        id: "inbound",
                                        label: "Barang Masuk",
                                        icon: "M19 14l-7 7m0 0l-7-7m7 7V3",
                                    },
                                    {
                                        id: "outbound",
                                        label: "Barang Keluar",
                                        icon: "M5 10l7-7m0 0l7 7m-7-7v18",
                                    },
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() =>
                                            setData({ ...data, type: type.id })
                                        }
                                        className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-4 ${
                                            data.type === type.id
                                                ? "bg-red-500 border-red-500 text-white shadow-xl shadow-red-500/20 active:scale-95"
                                                : "bg-gray-50 dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:border-red-500/50 group"
                                        }`}
                                    >
                                        <svg
                                            className={`w-6 h-6 ${data.type === type.id ? "text-white" : "text-gray-400 dark:text-zinc-600 group-hover:text-red-500"}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d={type.icon}
                                            />
                                        </svg>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-center">
                                            {type.label}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Date Range - Only for transactions */}
                            {data.type !== "inventory" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="space-y-2">
                                        <InputLabel
                                            value="Tanggal Mulai"
                                            className="text-[10px] font-black uppercase tracking-widest text-gray-500"
                                        />
                                        <TextInput
                                            type="date"
                                            className="w-full"
                                            value={data.start_date}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    start_date: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel
                                            value="Tanggal Selesai"
                                            className="text-[10px] font-black uppercase tracking-widest text-gray-500"
                                        />
                                        <TextInput
                                            type="date"
                                            className="w-full"
                                            value={data.end_date}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    end_date: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Format Selection */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600">
                                    Format Ekspor
                                </span>
                                <div className="flex gap-2 p-1 bg-gray-100 dark:bg-zinc-800/50 rounded-2xl w-fit">
                                    {["csv", "pdf"].map((format) => (
                                        <button
                                            key={format}
                                            onClick={() =>
                                                setData({
                                                    ...data,
                                                    format: format,
                                                })
                                            }
                                            className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                data.format === format
                                                    ? "bg-white dark:bg-zinc-700 text-red-600 dark:text-red-400 shadow-md"
                                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200"
                                            }`}
                                        >
                                            {format}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-8">
                                <PrimaryButton
                                    onClick={handleDownload}
                                    className="w-full justify-center py-6 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-red-600/30"
                                >
                                    Generate & Download
                                </PrimaryButton>
                                <p className="text-center text-[10px] text-gray-400 dark:text-zinc-600 mt-6 font-bold uppercase tracking-widest leading-loose">
                                    Dokumen akan diproses oleh server
                                    <br />
                                    Laporan akan menyertakan data sesuai filter
                                    yang dipilih
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
