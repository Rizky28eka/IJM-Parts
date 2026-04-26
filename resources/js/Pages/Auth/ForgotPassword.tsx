import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Kata Sandi" />

            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Lupa <span className="text-red-500">Sandi</span></h1>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-600 mt-2 leading-relaxed">
                    Beri tahu kami alamat email Anda dan kami akan mengirimkan tautan pengaturan ulang kata sandi.
                </p>
            </div>

            {status && (
                <div className="mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Masukkan alamat email Anda"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full justify-center py-4 text-[10px]" disabled={processing}>
                        Kirim Tautan Email
                    </PrimaryButton>
                </div>

                <div className="text-center pt-2">
                    <a href={route('login')} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors">
                        Kembali ke Halaman Masuk
                    </a>
                </div>
            </form>
        </GuestLayout>
    );
}
