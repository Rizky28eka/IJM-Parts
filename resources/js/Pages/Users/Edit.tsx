import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    user: User;
}

export default function Edit({ user }: Props) {
    const { auth } = usePage<PageProps>().props;
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('users.update', user.id), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Edit <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Profil Pengguna</span>
                </h2>
            }
        >
            <Head title="Edit Pengguna" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 transition-colors p-8 md:p-12">
                        <div className="mb-10">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">Pembaruan Data Pengguna</h3>
                            <p className="text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">Perbarui informasi dasar atau hak akses pengguna ini</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <InputLabel htmlFor="name" value="Nama Lengkap *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                    placeholder="Masukkan nama lengkap"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="email" value="Alamat Email *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    placeholder="nama@perusahaan.com"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="role" value="Hak Akses *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 focus:border-red-500 focus:ring-red-500/20 rounded-xl shadow-sm text-sm transition-colors"
                                    onChange={(e) => setData('role', e.target.value)}
                                    required
                                >
                                    <option value="karyawan">Karyawan (Akses Katalog & Request)</option>
                                    <option value="admin">Admin (Gudang & Manajemen)</option>
                                    {auth.user.role === 'owner' && (
                                        <option value="owner">Owner (Akses Penuh)</option>
                                    )}
                                </select>
                                <InputError message={errors.role} className="mt-2" />
                            </div>

                            <div className="pt-6 border-t border-gray-100 dark:border-zinc-800">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Ubah Kata Sandi (Opsional)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <InputLabel htmlFor="password" value="Kata Sandi Baru" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Kosongkan jika tidak diubah"
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi Baru" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Kosongkan jika tidak diubah"
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-end gap-6 pt-8 border-t border-gray-100 dark:border-zinc-800">
                                <Link
                                    href={route('users.index')}
                                    className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-400 transition-colors"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton disabled={processing} className="w-full sm:w-auto px-10 py-4 shadow-xl shadow-red-500/30 font-black tracking-widest">
                                    Simpan Perubahan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
