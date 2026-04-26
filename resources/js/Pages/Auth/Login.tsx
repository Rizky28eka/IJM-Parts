import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk Ke Sistem" />

            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Selamat <span className="text-red-500">Datang</span></h1>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-600 mt-1">Masuk untuk mengelola inventaris IJM</p>
            </div>

            {status && (
                <div className="mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="contoh@ijm.com"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                            >
                                Lupa sandi?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center group cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    (e.target.checked || false) as any,
                                )
                            }
                        />
                        <span className="ms-2 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors">
                            Ingat Saya
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full justify-center py-4" disabled={processing}>
                        Masuk Sekarang
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
