import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    BookOpen, 
    Vote, 
    Star, 
    Settings, 
    ExternalLink, 
    ShieldCheck, 
    FileText, 
    Plus, 
    RefreshCw, 
    Layers,
    Users,
    Compass,
    LogOut,
    Lock,
    Sparkles,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = 'Master CAP Admin' }) => {
    const page = usePage<any>();
    const url = page?.url || (typeof window !== 'undefined' ? window.location.pathname : '/admin');
    const flash = page?.props?.flash || {};

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Auto-lock portal on 30 minutes of client-side inactivity
    useEffect(() => {
        let timer: any;
        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                router.post('/admin/logout');
            }, 30 * 60 * 1000); // 30 minutes
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);
        resetTimer();

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
        };
    }, []);

    const safeUrl = url || '/admin';
    const isDashboard = safeUrl === '/admin' || safeUrl === '/admin/dashboard';
    const isArticles = safeUrl.startsWith('/admin/articles');
    const isPolls = safeUrl.startsWith('/admin/polls');
    const isReviews = safeUrl.startsWith('/admin/reviews');
    const isSettings = safeUrl.startsWith('/admin/settings');

    const navItems = [
        { label: 'Overview Dashboard', href: '/admin', icon: LayoutDashboard, active: isDashboard },
        { label: 'Articles & RSS Feeds', href: '/admin/articles', icon: BookOpen, active: isArticles },
        { label: 'Polls & Diagnostics', href: '/admin/polls', icon: Vote, active: isPolls },
        { label: 'Reviews & Community', href: '/admin/reviews', icon: Star, active: isReviews },
        { label: 'CAP Platform Settings', href: '/admin/settings', icon: Settings, active: isSettings },
    ];

    return (
        <div className="min-h-screen bg-[#F4FAFE] text-[#102A3D] flex font-sans">
            {/* Desktop Admin Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-[#041E34] border-r border-[#0B4778] text-white shrink-0">
                {/* Brand Logo */}
                <div className="p-6 border-b border-[#0B4778] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#287FBA] flex items-center justify-center font-black text-white text-sm shadow-md">
                        B
                    </div>
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#63B5E8] uppercase block font-outfit">
                            Secured Admin Hub
                        </span>
                        <span className="text-sm font-extrabold text-white font-outfit">
                            Bizztopia CAP
                        </span>
                    </div>
                </div>

                {/* Sidebar Navigation Links */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="text-[10px] font-bold text-[#8FC7E8] uppercase tracking-wider px-3 mb-2 font-outfit">
                        Core Control
                    </div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`
                                    flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all font-outfit
                                    ${item.active 
                                        ? 'bg-[#287FBA] text-white shadow-xs' 
                                        : 'text-[#8FC7E8] hover:bg-[#0B4778]/60 hover:text-white'}
                                `}
                            >
                                <div className="flex items-center gap-2.5">
                                    <Icon className="w-4 h-4 text-[#63B5E8]" />
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Quick Automation Actions */}
                <div className="p-4 border-t border-[#0B4778] bg-[#062F52] space-y-2 text-xs">
                    <div className="text-[10px] font-bold text-[#8FC7E8] uppercase tracking-wider mb-2 font-outfit">
                        Automation Triggers
                    </div>
                    <Link
                        href="/admin/sync-rss"
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center gap-2 bg-[#287FBA] hover:bg-[#1f689a] text-white py-2 px-3 rounded-xl font-bold transition-all text-xs cursor-pointer shadow-xs font-outfit"
                    >
                        <RefreshCw className="w-3.5 h-3.5" /> Sync RSS (50 Cap)
                    </Link>
                    <Link
                        href="/admin/rewrite-articles"
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center gap-2 bg-[#0B4778] hover:bg-[#287FBA] text-[#8FC7E8] hover:text-white py-2 px-3 rounded-xl font-bold transition-all text-xs cursor-pointer font-outfit"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Run AI Rewriter
                    </Link>
                </div>

                {/* Footer Lock Status */}
                <div className="p-4 border-t border-[#0B4778] bg-[#041E34] flex items-center justify-between text-xs text-[#8FC7E8]">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold font-outfit">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#249A68]" /> Master Access Active
                    </span>
                </div>
            </aside>

            {/* Main Content Viewport */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Admin Top Header */}
                <header className="bg-white border-b border-[#E6EEF3] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-lg text-[#102A3D] hover:bg-[#F4FAFE]"
                        >
                            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <h2 className="text-xl font-bold font-outfit text-[#102A3D]">
                            {title}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                href="/admin/sync-rss"
                                method="post"
                                as="button"
                                className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#287FBA] border border-blue-200 text-xs font-bold flex items-center gap-1.5 hover:bg-blue-100 transition-all cursor-pointer font-outfit"
                            >
                                <RefreshCw className="w-3.5 h-3.5" /> Sync Feeds (50/Day Cap)
                            </Link>
                            <Link
                                href="/admin/rewrite-articles"
                                method="post"
                                as="button"
                                className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-all cursor-pointer font-outfit"
                            >
                                <Sparkles className="w-3.5 h-3.5" /> Run Rewriter Pipeline
                            </Link>
                        </div>

                        <Link 
                            href="/" 
                            target="_blank"
                            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors font-outfit"
                        >
                            Frontend Site <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </header>

                {/* Mobile Drawer */}
                {sidebarOpen && (
                    <div className="lg:hidden bg-[#041E34] text-white border-b border-[#0B4778] px-4 py-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className="block px-3 py-2 rounded-xl text-xs font-bold hover:bg-[#0B4778]"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Content Container */}
                <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
                    {flash?.success && (
                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-bold text-xs">
                            ✅ {flash.success}
                        </div>
                    )}
                    {flash?.info && (
                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-800 font-bold text-xs">
                            ℹ️ {flash.info}
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
};
