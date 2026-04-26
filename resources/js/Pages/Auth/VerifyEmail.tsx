import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Verifikasi <span className="text-red-500">Email</span></h1>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-600 mt-4 leading-relaxed">
                    Terima kasih telah mendaftar! Sebelum memulai, harap verifikasi alamat email Anda dengan menekan tautan yang baru saja kami kirimkan. Jika Anda tidak menerimanya, kami akan mengirimkan yang baru.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="flex flex-col gap-4">
                    <PrimaryButton className="w-full justify-center py-4 text-[10px]" disabled={processing}>
                        Kirim Ulang Email Verifikasi
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                    >
                        Keluar
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
