import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler, useMemo } from 'react';

interface Part {
    id: number;
    name: string;
    sku: string;
    stock: number;
    unit: string;
}

interface Props {
    parts: Part[];
}

export default function Create({ parts }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        part_id: '' as number | '',
        date: new Date().toISOString().split('T')[0],
        physical_qty: '' as number | '',
        reason: '',
    });

    const selectedPart = useMemo(() => {
        return parts.find(p => p.id === data.part_id);
    }, [data.part_id, parts]);

    const discrepancy = useMemo(() => {
        if (selectedPart && typeof data.physical_qty === 'number') {
            return data.physical_qty - selectedPart.stock;
        }
        return null;
    }, [selectedPart, data.physical_qty]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('stock-adjustments.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Input <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Stock Opname</span>
                </h2>
            }
        >
            <Head title="Buat Stock Opname" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-8">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 transition-colors p-8 md:p-12">
                            <div className="mb-10">
                                <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">Penyesuaian Stok Fisik</h3>
                                <p className="text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">Sinkronisasi stok sistem dengan kondisi gudang</p>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="part_id" value="Pilih Suku Cadang *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                    <select
                                        id="part_id"
                                        className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 rounded-xl shadow-sm focus:border-red-500 focus:ring-red-500/20 text-sm transition-colors"
                                        value={data.part_id}
                                        onChange={e => setData('part_id', Number(e.target.value) || '')}
                                        required
                                    >
                                        <option value="">— Pilih Barang —</option>
                                        {parts.map(p => (
                                            <option key={p.id} value={p.id}>
                                                [{p.sku}] {p.name.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.part_id} className="mt-2" />
                                </div>

                                <div className="space-y-2">
                                    <InputLabel htmlFor="date" value="Tanggal Opname *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.date}
                                        onChange={e => setData('date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.date} className="mt-2" />
                                </div>

                                {selectedPart && (
                                    <div className="grid grid-cols-2 gap-4 p-6 rounded-[1.5rem] bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-300">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-gray-400 dark:text-zinc-500 tracking-widest">Stok di Sistem</p>
                                            <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                                                {selectedPart.stock} <span className="text-xs font-bold opacity-30 tracking-normal uppercase">{selectedPart.unit}</span>
                                            </p>
                                        </div>
                                        {discrepancy !== null && (
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase text-gray-400 dark:text-zinc-500 tracking-widest">Efek Selisih</p>
                                                <p className={`text-3xl font-black tracking-tighter ${discrepancy === 0 ? 'text-blue-500' : discrepancy > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                    {discrepancy > 0 ? '+' : ''}{discrepancy}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <InputLabel htmlFor="physical_qty" value="Jumlah Fisik Sebenarnya *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                    <TextInput
                                        id="physical_qty"
                                        type="number"
                                        min="0"
                                        className="mt-1 block w-full font-black text-2xl tracking-tighter md:text-3xl"
                                        value={data.physical_qty}
                                        onChange={e => setData('physical_qty', Number(e.target.value) || 0)}
                                        placeholder="0"
                                        required
                                    />
                                    <InputError message={errors.physical_qty} className="mt-2" />
                                </div>

                                <div className="space-y-2">
                                    <InputLabel htmlFor="reason" value="Alasan Penyesuaian / Catatan *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                    <textarea
                                        id="reason"
                                        className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 focus:border-red-500 focus:ring-red-500/20 rounded-xl shadow-sm text-sm transition-colors"
                                        value={data.reason}
                                        onChange={e => setData('reason', e.target.value)}
                                        rows={3}
                                        placeholder="Jelaskan mengapa terjadi selisih (contoh: salah hitung, hilang, bonus, dll)"
                                        required
                                    />
                                    <InputError message={errors.reason} className="mt-2" />
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100 dark:border-zinc-800">
                                <Link
                                    href={route('stock-adjustments.index')}
                                    className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-400 transition-colors"
                                >
                                    ← Batal & Kembali
                                </Link>
                                <PrimaryButton disabled={processing} className="w-full sm:w-auto px-10 py-4 shadow-xl shadow-red-500/30">
                                    {processing ? 'Memproses...' : 'Update Stok Sistem'}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
