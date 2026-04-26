import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#09090b] text-gray-600 dark:text-zinc-400 selection:bg-red-500 selection:text-white font-sans overflow-x-hidden transition-colors duration-300">
            <Head title="IJM Parts - Sistem Manajemen Inventaris Premium" />

            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-xl transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-3 group translate-z-0">
                            <ApplicationLogo className="w-10 h-10 text-red-500 transition-transform duration-500 group-hover:rotate-[360deg]" />
                            <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase sm:block hidden">
                                IJM <span className="text-red-500">Parts</span>
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-red-600 rounded-2xl hover:bg-red-500 transition-all duration-300 shadow-xl shadow-red-500/30 active:scale-95"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center gap-6">
                                    <Link
                                        href={route('login')}
                                        className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-red-600 rounded-2xl hover:bg-red-500 transition-all duration-300 shadow-xl shadow-red-500/30 active:scale-95"
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest mb-8 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            Manajemen Suku Cadang Mutakhir
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.1] uppercase">
                            Masa Depan <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                                Inventaris Cerdas
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                            Transformasikan efisiensi operasional Anda dengan IJM-Parts. Ekosistem terpusat untuk memantau, mengelola, dan mengembangkan inventaris industri Anda dengan presisi.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={auth.user ? route('dashboard') : route('register')}
                                className="w-full sm:w-auto px-10 py-5 text-[11px] font-black uppercase tracking-widest text-white bg-red-600 rounded-[2rem] hover:bg-red-500 hover:shadow-2xl hover:shadow-red-600/30 transition-all duration-500"
                            >
                                Mulai Sekarang
                            </Link>
                            <a
                                href="#features"
                                className="w-full sm:w-auto px-10 py-5 text-[11px] font-black uppercase tracking-widest text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-[2rem] hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-300 shadow-xl shadow-gray-200/50 dark:shadow-none"
                            >
                                Jelajahi Fitur
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features (Grid) */}
            <section id="features" className="py-24 relative bg-white/30 dark:bg-black/30 backdrop-blur-sm border-y border-gray-200 dark:border-zinc-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Kontrol Data Master",
                                desc: "Database terpusat untuk suku cadang, kategori, dan supplier dengan penyaringan tingkat lanjut.",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                )
                            },
                            {
                                title: "Wawasan Instan",
                                desc: "Audit real-time tingkat stok dan riwayat pergerakan otomatis untuk setiap item barang.",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Keamanan Perusahaan",
                                desc: "Manajemen akses berbasis peran untuk memastikan data operasional Anda tetap pribadi dan aman.",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                )
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-red-500/50 hover:bg-gray-50/50 dark:hover:bg-zinc-800/80 transition-all duration-500 shadow-2xl shadow-gray-200/50 dark:shadow-none">
                                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-zinc-500 font-medium leading-relaxed group-hover:text-gray-900 dark:group-hover:text-zinc-400 transition-colors">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-12 rounded-[3rem] bg-gradient-to-br from-white dark:from-zinc-900 to-gray-50 dark:to-black border border-gray-200 dark:border-zinc-800 relative overflow-hidden transition-colors duration-300 shadow-2xl shadow-gray-200/50 dark:shadow-none">
                        <div className="absolute top-0 right-0 w-[50%] h-full bg-red-500/5 blur-[100px] rounded-full translate-x-1/2" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
                            {[
                                { label: "Total Barang", value: "2,400+" },
                                { label: "Supplier Aktif", value: "82" },
                                { label: "Pergerakan Stok", value: "15k" },
                                { label: "Kehandalan", value: "99.9%" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter">{stat.value}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 border-t border-gray-100 dark:border-zinc-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex items-center gap-3">
                            <ApplicationLogo className="w-6 h-6 text-gray-400" />
                            <span className="text-[11px] font-black text-gray-400 dark:text-zinc-600 uppercase tracking-widest">
                                IJM Parts © {new Date().getFullYear()}
                            </span>
                        </div>
                        <div className="flex gap-8">
                            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Kebijakan Privasi</a>
                            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Syarat & Ketentuan</a>
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-700">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </div>
                    </div>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            ` }} />
        </div>
    );
}
