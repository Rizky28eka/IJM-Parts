import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        contact_person: '',
        phone: '',
        address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('suppliers.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Tambah <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Mitra Supplier</span>
                </h2>
            }
        >
            <Head title="Tambah Supplier" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 transition-colors p-8 md:p-12">
                        <div className="mb-10">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">Identitas Supplier</h3>
                            <p className="text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">Daftarkan mitra penyedia suku cadang baru</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <InputLabel htmlFor="name" value="Nama Perusahaan / Toko *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                    placeholder="Nama Lengkap Perusahaan"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="contact_person" value="Personel Kontak (PIC)" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                <TextInput
                                    id="contact_person"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.contact_person}
                                    onChange={(e) => setData('contact_person', e.target.value)}
                                    placeholder="Nama Orang yang Bisa Dihubungi"
                                />
                                <InputError message={errors.contact_person} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="phone" value="No. Telepon / WhatsApp" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                <TextInput
                                    id="phone"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="Contoh: 0812XXXXXXXX"
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="address" value="Alamat Kantor / Gudang" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                <textarea
                                    id="address"
                                    className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 focus:border-red-500 focus:ring-red-500/20 rounded-xl shadow-sm text-sm transition-colors"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    rows={3}
                                    placeholder="Alamat Lengkap Supplier"
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-end gap-6 pt-8 border-t border-gray-100 dark:border-zinc-800">
                                <Link
                                    href={route('suppliers.index')}
                                    className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-400 transition-colors"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton disabled={processing} className="w-full sm:w-auto px-10 py-4 shadow-xl shadow-red-500/30">
                                    Daftarkan Mitra
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
