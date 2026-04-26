import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react';

interface Part {
    id: number;
    name: string;
    sku: string;
    unit: string;
    stock: number;
}

interface Mechanic {
    id: number;
    name: string;
}

interface Props {
    parts: Part[];
    mechanics: Mechanic[];
}

interface Item {
    part_id: number | '';
    quantity: number | '';
}

export default function Create({ parts, mechanics }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        reference_number: string;
        date: string;
        type: 'sales' | 'service' | 'scrap';
        license_plate: string;
        mechanic_id: number | '';
        notes: string;
        items: Item[];
    }>({
        reference_number: '',
        date: new Date().toISOString().split('T')[0],
        type: 'sales',
        license_plate: '',
        mechanic_id: '',
        notes: '',
        items: [{ part_id: '', quantity: '' }],
    });

    const addItem = () => setData('items', [...data.items, { part_id: '', quantity: '' }]);

    const removeItem = (index: number) => setData('items', data.items.filter((_, i) => i !== index));

    const updateItem = (index: number, field: keyof Item, value: number | '') => {
        const updated = [...data.items];
        updated[index] = { ...updated[index], [field]: value };
        setData('items', updated);
    };

    const getSelectedPart = (partId: number | '') => parts.find(p => p.id === partId);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('outbounds.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Catat <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Barang Keluar</span>
                </h2>
            }
        >
            <Head title="Barang Keluar" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl space-y-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Header Info */}
                        <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 transition-colors">
                            <div className="px-8 py-6 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">Informasi Pengeluaran</h3>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Detail tujuan dan jenis pengeluaran</p>
                            </div>
                            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="date" value="Tanggal Keluar *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
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

                                <div className="space-y-2">
                                    <InputLabel htmlFor="reference_number" value="Referensi (No. Plat / Pelanggan)" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                    <TextInput
                                        id="reference_number"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.reference_number}
                                        onChange={e => setData('reference_number', e.target.value)}
                                        placeholder="Contoh: INV-2023-001"
                                    />
                                    <InputError message={errors.reference_number} className="mt-2" />
                                </div>

                                <div className="space-y-2">
                                    <InputLabel htmlFor="type" value="Jenis Pengeluaran *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                    <select
                                        id="type"
                                        className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 rounded-xl shadow-sm focus:border-red-500 focus:ring-red-500/20 text-sm transition-colors"
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value as any)}
                                        required
                                    >
                                        <option value="sales">Penjualan Langsung</option>
                                        <option value="service">Pemakaian Servis</option>
                                        <option value="scrap">Barang Rusak / Retur</option>
                                    </select>
                                    <InputError message={errors.type} className="mt-2" />
                                </div>

                                {data.type === 'service' && (
                                    <>
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                            <InputLabel htmlFor="mechanic_id" value="Mekanik Pelaksana" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                            <select
                                                id="mechanic_id"
                                                className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 rounded-xl shadow-sm focus:border-red-500 focus:ring-red-500/20 text-sm transition-colors"
                                                value={data.mechanic_id}
                                                onChange={e => setData('mechanic_id', Number(e.target.value) || '')}
                                            >
                                                <option value="">— Pilih Mekanik —</option>
                                                {mechanics.map(m => (
                                                    <option key={m.id} value={m.id}>{m.name.toUpperCase()}</option>
                                                ))}
                                            </select>
                                            <InputError message={errors.mechanic_id} className="mt-2" />
                                        </div>
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                            <InputLabel htmlFor="license_plate" value="Plat Nomor Kendaraan" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                            <TextInput
                                                id="license_plate"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.license_plate}
                                                onChange={e => setData('license_plate', e.target.value.toUpperCase())}
                                                placeholder="Contoh: B 1234 ABC"
                                            />
                                            <InputError message={errors.license_plate} className="mt-2" />
                                        </div>
                                    </>
                                )}

                                <div className={data.type === 'service' ? 'sm:col-span-2 space-y-2' : 'sm:col-span-2 space-y-2'}>
                                    <InputLabel htmlFor="notes" value="Keterangan Tambahan" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                    <textarea
                                        id="notes"
                                        className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 focus:border-red-500 focus:ring-red-500/20 rounded-xl shadow-sm text-sm transition-colors"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        rows={2}
                                        placeholder="Catatan tambahan (opsional)"
                                    />
                                    <InputError message={errors.notes} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 transition-colors">
                            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">Daftar Suku Cadang</h3>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Item yang akan dikeluarkan dari stok</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-500 transition-all active:scale-95"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Tambah Baris
                                </button>
                            </div>

                            <div className="p-8 space-y-6">
                                {(errors as any).items && (
                                    <div className="rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-5 py-4 text-xs font-bold text-red-600 dark:text-red-400 animate-pulse">
                                        ⚠️ {(errors as any).items}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {data.items.map((item, index) => {
                                        const selectedPart = getSelectedPart(item.part_id);
                                        const isLowStock = selectedPart && item.quantity !== '' && Number(item.quantity) > selectedPart.stock;
                                        return (
                                            <div key={index} className={`flex items-start gap-4 p-6 rounded-3xl border transition-all hover:border-red-500/30 ${isLowStock ? 'bg-red-50/50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30' : 'bg-gray-50 dark:bg-zinc-800/30 border-gray-100 dark:border-zinc-800'}`}>
                                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500">
                                                            Suku Cadang *
                                                        </label>
                                                        <select
                                                            className="block w-full border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-200 rounded-xl shadow-sm focus:border-red-500 focus:ring-red-500/20 text-xs transition-colors"
                                                            value={item.part_id}
                                                            onChange={e => updateItem(index, 'part_id', Number(e.target.value) || '')}
                                                            required
                                                        >
                                                            <option value="">— Pilih Barang —</option>
                                                            {parts.map(p => (
                                                                <option key={p.id} value={p.id} disabled={p.stock === 0}>
                                                                    [{p.sku}] {p.name.toUpperCase()} (Tersedia: {p.stock} {p.unit})
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {selectedPart && (
                                                            <p className={`px-1 text-[9px] font-bold uppercase tracking-widest ${selectedPart.stock === 0 ? 'text-red-500' : 'text-gray-400 dark:text-zinc-600'}`}>
                                                                Tersedia di Gudang: <span className="text-gray-700 dark:text-zinc-400">{selectedPart.stock} {selectedPart.unit}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500">
                                                            Jumlah Keluar *
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                max={selectedPart?.stock}
                                                                className={`block w-full border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 rounded-xl shadow-sm focus:border-red-500 focus:ring-red-500/20 text-xs transition-colors pr-12 ${isLowStock ? 'border-red-500 text-red-600' : ''}`}
                                                                value={item.quantity}
                                                                onChange={e => updateItem(index, 'quantity', Number(e.target.value) || '')}
                                                                placeholder="0"
                                                                required
                                                            />
                                                            {selectedPart && (
                                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 dark:text-zinc-600 uppercase tracking-widest">
                                                                    {selectedPart.unit}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {isLowStock && (
                                                            <p className="px-1 text-[9px] font-black text-red-600 uppercase tracking-widest animate-pulse">
                                                                ⚠ Stok tidak mencukupi!
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                {data.items.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="mt-6 shrink-0 rounded-xl p-2.5 text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                        title="Hapus Baris"
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
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                            <Link
                                href={route('outbounds.index')}
                                className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors"
                            >
                                Batal
                            </Link>
                            <PrimaryButton disabled={processing} className="px-10 py-4 shadow-xl shadow-red-500/30">
                                {processing ? 'Memproses...' : 'Simpan Transaksi'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
