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
    X
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = 'Master CAP Admin' }) => {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isDashboard = url === '/admin' || url === '/admin/dashboard';
    const isArticles = url.startsWith('/admin/articles');
    const isPolls = url.startsWith('/admin/polls');
    const isReviews = url.startsWith('/admin/reviews');
    const isSettings = url.startsWith('/admin/settings');

    const navItems = [
        { label: 'Overview Dashboard', href: '/admin', icon: LayoutDashboard, active: isDashboard },
        { label: 'Articles & RSS Feeds', href: '/admin/articles', icon: BookOpen, active: isArticles, badge: '200' },
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
                    <img src="/images/logo.png" alt="Bizztopia Admin" className="h-9 w-auto" />
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#63B5E8] uppercase block">
                            Admin Control Panel
                        </span>
                        <span className="text-sm font-extrabold text-white">
                            Bizztopia CAP
                        </span>
                    </div>
                </div>

                {/* Sidebar Navigation Links */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="text-[10px] font-bold text-[#8FC7E8] uppercase tracking-wider px-3 mb-2">
                        Core Management
                    </div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`
                                    flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all
                                    ${item.active 
                                        ? 'bg-[#287FBA] text-white shadow-xs' 
                                        : 'text-[#8FC7E8] hover:bg-[#0B4778]/60 hover:text-white'}
                                `}
                            >
                                <div className="flex items-center gap-2.5">
                                    <Icon className="w-4 h-4 text-[#63B5E8]" />
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="bg-[#0B4778] text-white text-[10px] px-2 py-0.5 rounded-full border border-[#287FBA]/40 font-semibold">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Status */}
                <div className="p-4 border-t border-[#0B4778] bg-[#062F52] space-y-3 text-xs text-[#8FC7E8]">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[11px]">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#249A68]" /> Engine v0.2
                        </span>
                        <span className="text-[10px] bg-[#249A68]/20 text-[#249A68] px-2 py-0.5 rounded-full font-bold">
                            Live
                        </span>
                    </div>
                    <Link 
                        href="/" 
                        target="_blank" 
                        className="w-full flex items-center justify-center gap-1.5 bg-[#0B4778] hover:bg-[#287FBA] text-white py-2 rounded-xl font-bold transition-colors text-xs"
                    >
                        View Frontend Site <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
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
                        <span className="hidden sm:inline-flex text-xs font-semibold text-[#466071] bg-[#F7FAFC] px-3 py-1.5 rounded-lg border border-[#E6EEF3]">
                            Logged in as Administrator
                        </span>
                        <Link 
                            href="/ideas" 
                            className="text-xs font-bold text-[#287FBA] hover:underline"
                        >
                            Open Ideas Portal →
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
                    {children}
                </main>
            </div>
        </div>
    );
};
