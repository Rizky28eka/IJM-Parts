import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
    ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';

interface Stat {
    label: string;
    value: string | number;
    icon: string;
    trend?: string;
    trendType?: 'up' | 'down' | 'neutral';
    color: string;
}

interface Activity {
    id: number;
    type: 'inbound' | 'outbound';
    sku: string;
    name: string;
    qty: number;
    time: string;
}

interface LowStock {
    id: number;
    sku: string;
    name: string;
    stock: number;
    min_stock: number;
}

interface FastMoving {
    id: number;
    sku: string;
    name: string;
    stock: number;
    unit: string;
    total_outbound: number;
}

interface Props {
    stats: {
        total_parts: number;
        low_stock_count: number;
        inbound_today: number;
        outbound_today: number;
        total_asset_value?: number;
    };
    chartData: Array<{ date: string; inbound: number; outbound: number }>;
    recentActivities: Activity[];
    lowStockParts: LowStock[];
    fastMovingParts?: FastMoving[];
}

export default function Dashboard({ 
    stats = { total_parts: 0, low_stock_count: 0, inbound_today: 0, outbound_today: 0, total_asset_value: 0 }, 
    chartData = [], 
    recentActivities = [], 
    lowStockParts = [],
    fastMovingParts = []
}: Props) {
    const { auth } = usePage<PageProps>().props;

    const formatIDR = (value: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
    };

    const statCards: Stat[] = [
        { 
            label: 'Total Suku Cadang', 
            value: stats.total_parts, 
            icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
            color: 'bg-blue-500' 
        },
        ...(auth.user.role === 'admin' ? [{ 
            label: 'Stok Kritis', 
            value: stats.low_stock_count, 
            icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
            color: 'bg-red-500',
            trend: 'Butuh atensi',
            trendType: 'down' as const
        }] : []),
        ...(auth.user.role === 'owner' ? [{
            label: 'Total Aset (Estimasi)',
            value: formatIDR(stats.total_asset_value || 0),
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            color: 'bg-indigo-500'
        }] : []),
        { 
            label: 'Masuk Hari Ini', 
            value: stats.inbound_today, 
            icon: 'M19 14l-7 7m0 0l-7-7m7 7V3',
            color: 'bg-emerald-500' 
        },
        { 
            label: 'Keluar Hari Ini', 
            value: stats.outbound_today, 
            icon: 'M5 10l7-7m0 0l7 7m-7-7v18',
            color: 'bg-orange-500' 
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                    Ringkasan <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Operasional</span>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((stat, idx) => (
                        <div key={idx} className="relative overflow-hidden group bg-white dark:bg-zinc-900 px-6 py-8 shadow-2xl shadow-gray-200/50 dark:shadow-none sm:rounded-[2rem] border border-gray-100 dark:border-zinc-800 transition-all hover:-translate-y-1">
                            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-gray-50 dark:bg-zinc-800 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                            
                            <div className="relative flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 text-white`}>
                                    <div className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`}>
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                        </svg>
                                    </div>
                                </div>
                                {stat.trend && (
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${stat.trendType === 'down' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                        {stat.trend}
                                    </span>
                                )}
                            </div>

                            <div className="relative">
                                <p className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 sm:rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-100/20 dark:shadow-none">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tighter uppercase">Tren Aktivitas Stok</h3>
                                <p className="text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">7 Hari Terakhir</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    <span className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Masuk</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                    <span className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Keluar</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
                                    <XAxis 
                                        dataKey="date" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 10, fontWeight: 900, fill: '#888'}} 
                                        dy={10}
                                        tickFormatter={(val) => new Date(val).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                    />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#888'}} />
                                    <RechartsTooltip 
                                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: '#18181b', color: '#fff' }}
                                        itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                                    />
                                    <Area type="monotone" dataKey="inbound" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIn)" />
                                    <Area type="monotone" dataKey="outbound" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorOut)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right Sidecard: Varies by Role */}
                    <div className="bg-white dark:bg-zinc-900 p-8 sm:rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-100/20 dark:shadow-none h-full overflow-hidden flex flex-col">
                        {auth.user.role === 'owner' ? (
                            <>
                                <div className="mb-6">
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tighter uppercase">Barang Fast Moving</h3>
                                    <p className="text-xs text-indigo-500 font-bold uppercase tracking-widest mt-1">Sering Keluar (30 Hari)</p>
                                </div>
                                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                    {fastMovingParts.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-10">
                                            <p className="text-[10px] font-black uppercase tracking-widest">+ Belum Ada Data</p>
                                        </div>
                                    ) : (
                                        fastMovingParts.map((part) => (
                                            <div key={part.id} className="p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10">
                                                <div className="flex justify-between items-start mb-1">
                                                    <div className="overflow-hidden">
                                                        <h4 className="text-xs font-black text-indigo-900 dark:text-indigo-300 uppercase truncate">{part.name}</h4>
                                                        <p className="text-[9px] font-bold text-indigo-400 dark:text-indigo-500/70 tracking-widest">{part.sku}</p>
                                                    </div>
                                                    <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 shrink-0">{part.total_outbound}</span>
                                                </div>
                                                <div className="text-[8px] font-black text-indigo-400 dark:text-indigo-500/70 uppercase">
                                                    Sisa Stok: {part.stock} {part.unit}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tighter uppercase">Stok Menipis</h3>
                                    <p className="text-xs text-red-500 font-black uppercase tracking-widest mt-1">Butuh Restok Segera</p>
                                </div>
                                
                                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                    {lowStockParts.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-10">
                                            <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-[10px] font-black uppercase tracking-widest">Semua Stok Aman</p>
                                        </div>
                                    ) : (
                                        lowStockParts.map((part) => (
                                            <div key={part.id} className="p-4 rounded-3xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 hover:border-red-500/30 transition-all group">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="overflow-hidden">
                                                        <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase truncate">{part.name}</h4>
                                                        <p className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 tracking-widest">{part.sku}</p>
                                                    </div>
                                                    <span className="text-[10px] font-black text-red-500 shrink-0">{part.stock} unit</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-red-500 rounded-full group-hover:bg-red-400 transition-all duration-1000"
                                                        style={{ width: `${Math.min((part.stock / part.min_stock) * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between mt-2">
                                                    <span className="text-[8px] font-black text-gray-400 dark:text-zinc-600 uppercase">Min: {part.min_stock}</span>
                                                    <Link href={route('inbounds.create')} className="text-[8px] font-black text-red-500 uppercase hover:underline">Restok</Link>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Live Activity Table */}
                <div className="bg-white dark:bg-zinc-900 overflow-hidden shadow-xl shadow-gray-100/20 dark:shadow-none sm:rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 transition-colors">
                    <div className="px-8 py-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tighter uppercase">Aktivitas Terkini</h3>
                            <p className="text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">Log Pergerakan Barang</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route('inbounds.index')} className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-xl hover:bg-emerald-500/20 transition-all">Masuk</Link>
                            <Link href={route('outbounds.index')} className="text-[10px] font-black uppercase text-orange-500 bg-orange-500/10 px-4 py-2 rounded-xl hover:bg-orange-500/20 transition-all">Keluar</Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-[#0c0c0e]">
                                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-600">
                                    <th className="px-8 py-5">Tipe</th>
                                    <th className="px-8 py-5">Suku Cadang</th>
                                    <th className="px-8 py-5">Jumlah</th>
                                    <th className="px-8 py-5">Waktu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                                {recentActivities.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-10 text-center opacity-30 text-[10px] font-black uppercase tracking-widest items-center">
                                            Tidak Ada Aktivitas Hari Ini
                                        </td>
                                    </tr>
                                ) : (
                                    recentActivities.map((act) => (
                                        <tr key={act.id} className="group hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-all">
                                            <td className="px-8 py-4">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${act.type === 'inbound' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                                    {act.type === 'inbound' ? 'Masuk' : 'Keluar'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="text-sm font-black text-gray-800 dark:text-zinc-200 group-hover:text-red-500 transition-colors uppercase">{act.name}</div>
                                                <div className="text-[10px] text-gray-400 dark:text-zinc-600 font-bold">{act.sku}</div>
                                            </td>
                                            <td className="px-8 py-4 text-sm font-black text-gray-900 dark:text-white">
                                                {act.type === 'inbound' ? '+' : '-'}{act.qty}
                                            </td>
                                            <td className="px-8 py-4 text-[10px] font-black text-gray-500 dark:text-zinc-600 uppercase tracking-widest">
                                                {act.time}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
