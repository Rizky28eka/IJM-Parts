import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Brand {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
    brands: Brand[];
}

export default function Create({ categories, brands }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        sku: '',
        name: '',
        category_id: '',
        brand_id: '',
        location: '',
        unit: 'PCS',
        stock: 0,
        min_stock: 5,
        buy_price: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('parts.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Tambah <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Suku Cadang Baru</span>
                </h2>
            }
        >
            <Head title="Tambah Suku Cadang" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <div className="bg-white dark:bg-zinc-900 p-8 shadow-2xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 transition-colors">
                        <div className="mb-10">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">Informasi Suku Cadang</h3>
                            <p className="text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">Lengkapi detail untuk katalog inventory</p>
                        </div>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* SKU & Name */}
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="sku" value="SKU / Part Number" className="text-[10px] font-black uppercase tracking-widest mb-1 text-gray-500" />
                                        <TextInput
                                            id="sku"
                                            className="mt-1 block w-full"
                                            value={data.sku}
                                            onChange={(e) => setData('sku', e.target.value)}
                                            required
                                            isFocused
                                            placeholder="Contoh: IJM-001"
                                        />
                                        <InputError message={errors.sku} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="name" value="Nama Barang" className="text-[10px] font-black uppercase tracking-widest mb-1 text-gray-500" />
                                        <TextInput
                                            id="name"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            placeholder="Nama Lengkap Komponen"
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                </div>

                                {/* Category & Brand */}
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="category_id" value="Kategori" className="text-[10px] font-black uppercase tracking-widest mb-1 text-gray-500" />
                                        <select
                                            id="category_id"
                                            className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 focus:border-red-500 focus:ring-red-500/20 rounded-xl shadow-sm text-sm transition-colors"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Pilih Kategori</option>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                        <InputError message={errors.category_id} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="brand_id" value="Merk" className="text-[10px] font-black uppercase tracking-widest mb-1 text-gray-500" />
                                        <select
                                            id="brand_id"
                                            className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 focus:border-red-500 focus:ring-red-500/20 rounded-xl shadow-sm text-sm transition-colors"
                                            value={data.brand_id}
                                            onChange={(e) => setData('brand_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Pilih Merk</option>
                                            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                        </select>
                                        <InputError message={errors.brand_id} className="mt-2" />
                                    </div>
                                </div>

                                {/* Stock Info */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="stock" value="Stok Awal" className="text-[10px] font-black uppercase tracking-widest mb-1 text-gray-500" />
                                            <TextInput
                                                id="stock"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.stock}
                                                onChange={(e) => setData('stock', parseInt(e.target.value) || 0)}
                                                required
                                            />
                                            <InputError message={errors.stock} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="min_stock" value="Minimal Stok" className="text-[10px] font-black uppercase tracking-widest mb-1 text-gray-500" />
                                            <TextInput
                                                id="min_stock"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.min_stock}
                                                onChange={(e) => setData('min_stock', parseInt(e.target.value) || 0)}
                                                required
                                            />
                                            <InputError message={errors.min_stock} className="mt-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="unit" value="Satuan (Pcs, Set, Ltr)" className="text-[10px] font-black uppercase tracking-widest mb-1 text-gray-500" />
                                        <TextInput
                                            id="unit"
                                            className="mt-1 block w-full uppercase"
                                            value={data.unit}
                                            onChange={(e) => setData('unit', e.target.value.toUpperCase())}
                                            required
                                            placeholder="PCS"
                                        />
                                        <InputError message={errors.unit} className="mt-2" />
                                    </div>
                                </div>

                                {/* Price & Location */}
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="buy_price" value="Harga Beli (Satuan)" className="text-[10px] font-black uppercase tracking-widest mb-1 text-gray-500" />
                                        <TextInput
                                            id="buy_price"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={data.buy_price}
                                            onChange={(e) => setData('buy_price', parseInt(e.target.value) || 0)}
                                            required
                                            placeholder="0"
                                        />
                                        <InputError message={errors.buy_price} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="location" value="Lokasi Rak Fisik" className="text-[10px] font-black uppercase tracking-widest mb-1 text-gray-500" />
                                        <TextInput
                                            id="location"
                                            className="mt-1 block w-full"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="Contoh: Rak Gudang A-1"
                                        />
                                        <InputError message={errors.location} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-6 pt-10 border-t border-gray-100 dark:border-zinc-800">
                                <Link
                                    href={route('parts.index')}
                                    className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton className="px-10 py-4 shadow-xl shadow-red-500/20" disabled={processing}>
                                    Daftarkan Item
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
