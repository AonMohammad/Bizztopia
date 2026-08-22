import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
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
    ChevronRight,
    Menu,
    X,
    Search,
    Bell,
    User,
    Megaphone
} from 'lucide-react';

export const AdminLayout = ({ children, title = 'Dashboard' }) => {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isDashboard = url === '/admin' || url === '/admin/dashboard';
    const isBoards = url.startsWith('/admin/boards');
    const isArticles = url.startsWith('/admin/articles');
    const isPolls = url.startsWith('/admin/polls');
    const isReviews = url.startsWith('/admin/reviews');
    const isSettings = url.startsWith('/admin/settings');

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, active: isDashboard },
        { label: 'Editorial Boards & Ads', href: '/admin/boards', icon: Layers, active: isBoards, count: '4' },
        { label: 'Articles & Playbooks', href: '/admin/articles', icon: BookOpen, active: isArticles, count: '210' },
        { label: 'Polls & Diagnostics', href: '/admin/polls', icon: Vote, active: isPolls, count: '3' },
        { label: 'Reviews & Community', href: '/admin/reviews', icon: Star, active: isReviews, count: '5' },
        { label: 'Platform Settings', href: '/admin/settings', icon: Settings, active: isSettings },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased">
            {/* Filament v3 Dark Slate Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 text-slate-200 shrink-0">
                {/* Filament Brand Logo */}
                <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-base shadow-md">
                            F
                        </div>
                        <span className="font-extrabold text-white text-base tracking-tight font-outfit">
                            Filament <span className="text-amber-500 text-xs px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">v3</span>
                        </span>
                    </Link>
                </div>

                {/* Filament Sidebar Navigation */}
                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
                        Content Resources
                    </div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`
                                    flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150
                                    ${item.active 
                                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-xs font-bold' 
                                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-4 h-4 ${item.active ? 'text-amber-400' : 'text-slate-400'}`} />
                                    <span>{item.label}</span>
                                </div>
                                {item.count && (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.active ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                                        {item.count}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Filament Sidebar Footer */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-3">
                    <Link 
                        href="/" 
                        target="_blank" 
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-700"
                    >
                        <span>Open Bizztopia Site</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                </div>
            </aside>

            {/* Main Content Viewport */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
                {/* Filament Header Bar */}
                <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        <h1 className="text-lg font-bold font-outfit text-white flex items-center gap-2">
                            {title}
                        </h1>
                    </div>

                    {/* Filament Quick Search & User Profile */}
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block w-64">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text"
                                placeholder="Search resources..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                            />
                        </div>

                        <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs">
                                AD
                            </div>
                            <span className="hidden sm:inline-block text-xs font-semibold text-slate-300">Admin Panel</span>
                        </div>
                    </div>
                </header>

                {/* Mobile Drawer */}
                {sidebarOpen && (
                    <div className="lg:hidden bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className="block px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-800 text-slate-200"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Filament Viewport Body */}
                <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto bg-slate-950">
                    {children}
                </main>
            </div>
        </div>
    );
};
