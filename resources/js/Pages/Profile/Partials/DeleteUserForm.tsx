import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">
                    Hapus Akun
                </h2>

                <p className="mt-1 text-xs text-red-500 dark:text-red-400 font-bold uppercase tracking-widest leading-relaxed">
                    Tindakan ini permanen. Setelah akun dihapus, semua sumber daya dan data Anda akan hilang selamanya.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion} className="px-8 py-3 rounded-2xl shadow-lg shadow-red-500/20">
                Hapus Akun Saya
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-10 bg-white dark:bg-zinc-900 overflow-hidden rounded-[2.5rem]">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
                        Apakah Anda yakin ingin menghapus akun?
                    </h2>

                    <p className="mt-4 text-[11px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest leading-relaxed">
                        Harap masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun secara permanen. Data yang sudah dihapus tidak dapat dipulihkan.
                    </p>

                    <div className="mt-8 space-y-2">
                        <InputLabel
                            htmlFor="password"
                            value="Kata Sandi"
                            className="text-[10px] font-black uppercase tracking-widest text-gray-400"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Kata Sandi Anda"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-10 flex justify-end gap-4">
                        <SecondaryButton onClick={closeModal} className="px-6 py-3 border-none text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">
                            Batal
                        </SecondaryButton>

                        <DangerButton className="px-8 py-3 shadow-xl shadow-red-500/30" disabled={processing}>
                            Hapus Permanen
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
