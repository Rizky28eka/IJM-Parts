import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

interface PartRequestDetail {
    id: number;
    part: { name: string; sku: string; unit: string };
    quantity: number;
}

interface PartRequest {
    id: number;
    user: { name: string };
    status: 'pending' | 'approved' | 'rejected';
    reason: string;
    admin_notes: string;
    approved_at: string;
    approver?: { name: string };
    details: PartRequestDetail[];
    created_at: string;
}

interface Props {
    requests: PartRequest[];
}

export default function Index({ requests }: Props) {
    const { auth } = usePage<PageProps>().props;
    const [actionModal, setActionModal] = useState<{ id: number; type: 'approve' | 'reject' } | null>(null);

    const { data, setData, patch, processing, errors, reset } = useForm({
        admin_notes: '',
    });

    const handleAction = (e: React.FormEvent) => {
        e.preventDefault();
        if (!actionModal) return;

        patch(route(`part-requests.${actionModal.type}`, actionModal.id), {
            onSuccess: () => {
                setActionModal(null);
                reset('admin_notes');
            },
        });
    };

    const statusBadge = (status: string) => {
        const styles = {
            pending: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
            approved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
        };
        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles]}`}>
                {status}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                        Log <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Permintaan Barang</span>
                    </h2>
                    {auth.user.role === 'karyawan' && (
                        <Link
                            href={route('part-requests.create')}
                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/20 hover:bg-red-500 transition-all font-bold"
                        >
                            Buat Permintaan
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Riwayat Permintaan" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-6">
                    {requests.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-200 dark:border-zinc-800">
                             <div className="text-gray-400 dark:text-zinc-600 text-xs font-black uppercase tracking-[0.2em]">Tidak Ada Riwayat Permintaan</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {requests.map((request) => (
                                <div key={request.id} className="overflow-hidden bg-white dark:bg-zinc-900 shadow-xl sm:rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 transition-all">
                                    <div className="p-8">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black text-gray-400 dark:text-zinc-600 uppercase tracking-widest font-mono">REQ #{request.id}</span>
                                                    {statusBadge(request.status)}
                                                    <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-600 uppercase italic">• {new Date(request.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600 mb-1">Keperluan:</h4>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white uppercase leading-relaxed">{request.reason}</p>
                                                    {auth.user.role !== 'karyawan' && (
                                                        <p className="text-xs text-red-500 font-black mt-2 uppercase tracking-wide">Diajukan oleh: <span className="font-black text-gray-900 dark:text-white underline decoration-red-500/30 underline-offset-4">{request.user.name}</span></p>
                                                    )}
                                                </div>

                                                <div className="pt-2">
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600 mb-3">Item yang diminta:</h4>
                                                    <div className="flex flex-wrap gap-3">
                                                        {request.details.map((detail) => (
                                                            <div key={detail.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                                                                <span className="text-xs font-black text-red-500">{detail.quantity}</span>
                                                                <div className="text-[10px] font-bold text-gray-700 dark:text-zinc-300 uppercase truncate max-w-[150px]">
                                                                    {detail.part.name}
                                                                </div>
                                                                <span className="text-[9px] font-black text-gray-400 uppercase">{detail.part.unit}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:w-64 space-y-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 dark:border-zinc-800 md:pl-8 flex flex-col justify-center">
                                                {request.status === 'pending' && auth.user.role !== 'karyawan' ? (
                                                    <div className="space-y-3">
                                                        <button
                                                            onClick={() => setActionModal({ id: request.id, type: 'approve' })}
                                                            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                                                        >
                                                            Setujui
                                                        </button>
                                                        <button
                                                            onClick={() => setActionModal({ id: request.id, type: 'reject' })}
                                                            className="w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-zinc-400 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                                                        >
                                                            Tolak
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600 mb-1 font-mono">Response Admin:</h4>
                                                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-zinc-800">
                                                                <p className="text-[10px] text-gray-600 dark:text-zinc-400 italic leading-relaxed">
                                                                    {request.admin_notes || 'Tidak ada catatan admin.'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {request.approver && (
                                                            <div className="pt-2 border-t border-gray-100 dark:border-zinc-800">
                                                                <p className="text-[9px] font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-tight mb-1">Diproses oleh:</p>
                                                                <p className="text-[10px] font-black text-gray-900 dark:text-zinc-200 uppercase">{request.approver.name}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Modal */}
            <Modal show={!!actionModal} onClose={() => setActionModal(null)}>
                <form onSubmit={handleAction} className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`p-3 rounded-2xl ${actionModal?.type === 'approve' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               {actionModal?.type === 'approve' ? (
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                               ) : (
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                               )}
                           </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tighter text-gray-900 dark:text-white">
                                {actionModal?.type === 'approve' ? 'Setujui Permintaan' : 'Tolak Permintaan'}
                            </h3>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Konfirmasi pemrosesan data</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="admin_notes" value="Catatan Penjelasan (Optional)" className="text-[10px] font-black uppercase tracking-widest text-gray-500" />
                        <textarea
                            id="admin_notes"
                            className="mt-1 block w-full border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-300 focus:border-red-500 focus:ring-red-500/20 rounded-xl shadow-sm text-sm transition-colors"
                            value={data.admin_notes}
                            onChange={e => setData('admin_notes', e.target.value)}
                            rows={3}
                            placeholder="Contoh: Barang sudah disiapkan di meja teknisi."
                        />
                        <InputError message={errors.admin_notes} className="mt-2" />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setActionModal(null)}>Batal</SecondaryButton>
                        <PrimaryButton 
                            className={actionModal?.type === 'reject' ? 'bg-red-600 hover:bg-red-500 ring-red-500' : 'bg-emerald-600 hover:bg-emerald-500 ring-emerald-500'}
                            disabled={processing}
                        >
                            {processing ? '...' : (actionModal?.type === 'approve' ? 'Konfirmasi & Kurangi Stok' : 'Konfirmasi Penolakan')}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
