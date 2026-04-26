import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">
                    Informasi Profil
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest">
                    Perbarui nama akun dan alamat email Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-8 space-y-6">
                <div className="space-y-2">
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-2xl bg-amber-500/5 border border-amber-500/10 p-4">
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">
                            Alamat email Anda belum diverifikasi.
                        </p>
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="mt-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors underline decoration-red-500/30 underline-offset-4"
                        >
                            Klik di sini untuk mengirim ulang email verifikasi.
                        </Link>

                        {status === 'verification-link-sent' && (
                            <div className="mt-3 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20">
                                Tautan verifikasi baru telah dikirim ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className="px-8 py-3 shadow-lg shadow-red-500/20">Simpan Perubahan</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                            Berhasil Disimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
