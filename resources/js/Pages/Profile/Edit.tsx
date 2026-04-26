import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Pengaturan <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Profil Akun</span>
                </h2>
            }
        >
            <Head title="Profil" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Header Info */}
                    <div className="mb-2">
                        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Kelola <span className="text-red-500">Akun</span></h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-600 mt-1">Perbarui informasi identitas dan keamanan akses Anda</p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 shadow-2xl sm:rounded-[2.5rem] transition-colors duration-300">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 shadow-2xl sm:rounded-[2.5rem] transition-colors duration-300">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white/50 dark:bg-red-500/5 border border-red-100 dark:border-red-900/20 p-8 shadow-xl sm:rounded-[2.5rem] transition-colors duration-300">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
