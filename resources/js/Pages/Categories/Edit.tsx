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

interface Props {
    category: Category;
}

export default function Edit({ category }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: category.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('categories.update', category.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Edit <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Data Kategori</span>
                </h2>
            }
        >
            <Head title="Edit Kategori" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 transition-colors p-8 md:p-12">
                        <div className="mb-10">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">Pembaruan Kategori</h3>
                            <p className="text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">Perbarui klasifikasi suku cadang di sistem</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <InputLabel htmlFor="name" value="Nama Kategori *" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-end gap-6 pt-8 border-t border-gray-100 dark:border-zinc-800">
                                <Link
                                    href={route('categories.index')}
                                    className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-400 transition-colors"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton disabled={processing} className="w-full sm:w-auto px-10 py-4 shadow-xl shadow-red-500/30">
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
