import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react';

interface Part {
    id: number;
    name: string;
    sku: string;
    unit: string;
    stock: number;
}

interface Props {
    parts: Part[];
}

interface Item {
    part_id: number | '';
    quantity: number | '';
}

export default function Create({ parts }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        reason: string;
        items: Item[];
    }>({
        reason: '',
        items: [{ part_id: '', quantity: '' }],
    });

    const addItem = () => {
        setData('items', [...data.items, { part_id: '', quantity: '' }]);
    };

    const removeItem = (index: number) => {
        setData('items', data.items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: keyof Item, value: number | '') => {
        const updated = [...data.items];
        updated[index] = { ...updated[index], [field]: value };
        setData('items', updated);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('part-requests.store'));
    };

    const getSelectedPart = (partId: number | '') => parts.find(p => p.id === partId);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Ajukan <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Permintaan Barang</span>
                </h2>
            }
        >
            <Head title="Request Barang" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl space-y-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Info Banner */}
                        <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] p-8 flex items-start gap-4 ring-1 ring-emerald-500/20">
                            <div className="bg-emerald-500 rounded-2xl p-3 shadow-lg shadow-emerald-500/20">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Prosedur Pengajuan</h4>
                                <p className="text-xs text-emerald-800/60 dark:text-emerald-400/60 font-bold mt-1">Permintaan Anda akan ditinjau oleh Admin Gudang. Pastikan alasan penggunaan diisi dengan jelas.</p>
                            </div>
                        </div>

                        {/* Reason / Notes */}
                        <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 transition-colors">
                            <div className="px-8 py-6 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">Alasan & Keperluan</h3>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Detail tujuan permintaan unit suku cadang</p>
                            </div>
                            <div className="p-8">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="reason" value="Tujuan Penggunaan Barang *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                    <textarea
                                        id="reason"
                                        className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 focus:border-red-500 focus:ring-red-500/20 rounded-xl shadow-sm text-sm transition-colors"
                                        value={data.reason}
                                        onChange={e => setData('reason', e.target.value)}
                                        rows={3}
                                        placeholder="Tuliskan alasan permohonan barang..."
                                        required
                                    />
                                    <InputError message={errors.reason} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 transition-colors">
                            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">Daftar Barang</h3>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Pilih item yang ingin diminta</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-500 transition-all active:scale-95"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Tambah Item
                                </button>
                            </div>

                            <div className="p-8 space-y-6">
                                {data.items.map((item, index) => {
                                    const selectedPart = getSelectedPart(item.part_id);
                                    return (
                                        <div key={index} className="flex items-start gap-4 p-6 rounded-3xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-zinc-800 group transition-all hover:border-red-500/30">
                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500">Barang *</label>
                                                    <select
                                                        className="block w-full border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-200 rounded-xl shadow-sm focus:border-red-500 focus:ring-red-500/20 text-xs transition-colors"
                                                        value={item.part_id}
                                                        onChange={e => updateItem(index, 'part_id', Number(e.target.value) || '')}
                                                        required
                                                    >
                                                        <option value="">— Cari Suku Cadang —</option>
                                                        {parts.map(p => (
                                                            <option key={p.id} value={p.id}>
                                                                [{p.sku}] {p.name.toUpperCase()}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {selectedPart && (
                                                        <p className="px-1 text-[9px] font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-widest">
                                                            Tersedia: <span className="text-gray-700 dark:text-zinc-400">{selectedPart.stock} {selectedPart.unit}</span>
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500">Jumlah *</label>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max={selectedPart?.stock || 99999}
                                                            className="block w-full border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 rounded-xl shadow-sm focus:border-red-500 focus:ring-red-500/20 text-xs pr-12"
                                                            value={item.quantity}
                                                            onChange={e => updateItem(index, 'quantity', Number(e.target.value) || '')}
                                                            required
                                                        />
                                                        {selectedPart && (
                                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedPart.unit}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {data.items.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(index)}
                                                    className="mt-6 shrink-0 rounded-xl p-2.5 text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-6 pt-6 mb-12 border-t border-gray-100 dark:border-zinc-800">
                            <Link
                                href={route('part-requests.index')}
                                className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors"
                            >
                                Batal
                            </Link>
                            <PrimaryButton disabled={processing} className="px-10 py-4 shadow-xl shadow-red-500/30">
                                {processing ? 'Mengirim...' : 'Kirim Permintaan'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
