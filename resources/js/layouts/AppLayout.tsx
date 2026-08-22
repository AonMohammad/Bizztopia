import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    BookOpen, 
    Sparkles, 
    Calculator, 
    MessageSquare, 
    Compass, 
    Menu, 
    X, 
    CheckSquare,
    FileText,
    HelpCircle,
    Layers,
    Smartphone,
    Percent
} from 'lucide-react';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const isIdeas = url.startsWith('/ideas');
    const isEngage = url.startsWith('/engage');
    const isValue = url.startsWith('/value');
    const isSocial = url.startsWith('/social');
    const isInspire = url.startsWith('/inspire');

    return (
        <div className="min-h-screen bg-[#F7FAFC] text-[#102A3D] flex flex-col font-sans">
            {/* Header Navigation — Deep Midnight Dark Blue Palette */}
            <header className="bg-dark-blue-nav text-white sticky top-0 z-50 shadow-lg border-b border-[#0B4778] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        
                        {/* Master Platform Logo — Clean Logo Only */}
                        <div className="flex items-center gap-3 shrink-0">
                            <Link href="/" className="flex items-center gap-3 group">
                                <img 
                                    src="/images/logo.png" 
                                    alt="Bizztopia" 
                                    className="h-10 w-auto transition-transform group-hover:scale-105" 
                                />
                            </Link>
                        </div>

                        {/* Top Module Navigation — Clean Underline Bar Effect (WeddingWire Style) */}
                        <nav className="hidden md:flex flex-1 max-w-3xl mx-8 justify-between items-center h-20">
                            {/* Module 01: Ideas Dropdown */}
                            <div 
                                className="h-full flex items-center"
                                onMouseEnter={() => setActiveDropdown('ideas')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link 
                                    href="/ideas" 
                                    className={`
                                        relative h-full flex items-center text-sm font-bold tracking-wide transition-all border-b-2 px-1
                                        ${isIdeas || activeDropdown === 'ideas' 
                                            ? 'text-[#63B5E8] border-[#4A9AD4]' 
                                            : 'text-[#D5EBF8] border-transparent hover:text-white hover:border-[#63B5E8]'}
                                    `}
                                >
                                    <span>Ideas</span>
                                </Link>

                                {/* WeddingWire-Style Full-Width Jumbo Mega Dropdown */}
                                {activeDropdown === 'ideas' && (
                                    <div 
                                        className="absolute left-0 right-0 top-full bg-white text-[#102A3D] shadow-2xl border-b border-[#E6EEF3] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                                        onMouseEnter={() => setActiveDropdown('ideas')}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8 text-left">
                                            
                                            {/* Column 1: Subcategories with Icons (Cols 1-5) */}
                                            <div className="col-span-5 space-y-4 border-r border-[#E6EEF3] pr-6">
                                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0B4778]">
                                                    Explore Business Ideas
                                                </h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <Link href="/ideas?type=Blog" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F4FAFE] transition-colors group">
                                                        <FileText className="w-4 h-4 text-[#4A9AD4] group-hover:scale-110 transition-transform" />
                                                        <span className="text-xs font-bold text-[#102A3D] group-hover:text-[#287FBA]">Blogs</span>
                                                    </Link>

                                                    <Link href="/ideas?type=Industry+Guide" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F4FAFE] transition-colors group">
                                                        <BookOpen className="w-4 h-4 text-[#4A9AD4] group-hover:scale-110 transition-transform" />
                                                        <span className="text-xs font-bold text-[#102A3D] group-hover:text-[#287FBA]">Industry Guides</span>
                                                    </Link>

                                                    <Link href="/ideas?type=Tips+%26+Tricks" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F4FAFE] transition-colors group">
                                                        <Sparkles className="w-4 h-4 text-[#4A9AD4] group-hover:scale-110 transition-transform" />
                                                        <span className="text-xs font-bold text-[#102A3D] group-hover:text-[#287FBA]">Tips & Tricks</span>
                                                    </Link>

                                                    <Link href="/ideas?type=How-To" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F4FAFE] transition-colors group">
                                                        <HelpCircle className="w-4 h-4 text-[#4A9AD4] group-hover:scale-110 transition-transform" />
                                                        <span className="text-xs font-bold text-[#102A3D] group-hover:text-[#287FBA]">How-To Articles</span>
                                                    </Link>

                                                    <Link href="/ideas?type=Checklist" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F4FAFE] transition-colors group">
                                                        <CheckSquare className="w-4 h-4 text-[#4A9AD4] group-hover:scale-110 transition-transform" />
                                                        <span className="text-xs font-bold text-[#102A3D] group-hover:text-[#287FBA]">Checklists</span>
                                                    </Link>

                                                    <Link href="/ideas?type=Guide" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F4FAFE] transition-colors group">
                                                        <Compass className="w-4 h-4 text-[#4A9AD4] group-hover:scale-110 transition-transform" />
                                                        <span className="text-xs font-bold text-[#102A3D] group-hover:text-[#287FBA]">Guides</span>
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Column 2: Growth Tools & Generators (Cols 6-8) */}
                                            <div className="col-span-3 space-y-4 border-r border-[#E6EEF3] pr-6">
                                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0B4778]">
                                                    Decision Tools
                                                </h4>
                                                <div className="space-y-2.5 text-xs font-medium text-[#466071]">
                                                    <Link href="/value" className="block hover:text-[#287FBA] hover:font-bold transition-all">
                                                        Marketing ROI Estimator
                                                    </Link>
                                                    <Link href="/value" className="block hover:text-[#287FBA] hover:font-bold transition-all">
                                                        Startup Cost Calculator
                                                    </Link>
                                                    <Link href="/engage" className="block hover:text-[#287FBA] hover:font-bold transition-all">
                                                        Founder Archetype Quiz
                                                    </Link>
                                                    <Link href="/ideas" className="block hover:text-[#287FBA] hover:font-bold transition-all">
                                                        RSS Feed Ingestion Service
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Column 3: Featured Promos & Cards (Cols 9-12) */}
                                            <div className="col-span-4 space-y-4">
                                                {/* App Promo Card */}
                                                <div className="bg-[#F7FAFC] p-4 rounded-xl border border-[#E6EEF3] flex items-center justify-between gap-4">
                                                    <div>
                                                        <div className="text-xs font-bold text-[#102A3D]">Get the Bizztopia app</div>
                                                        <div className="text-[11px] text-[#718797] mt-0.5">
                                                            Access business playbooks wherever and whenever you want.
                                                        </div>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-xl bg-[#287FBA] text-white flex items-center justify-center shrink-0">
                                                        <Smartphone className="w-5 h-5" />
                                                    </div>
                                                </div>

                                                {/* Live Feeds Card */}
                                                <div className="bg-[#EAF5FC] p-4 rounded-xl border border-[#8FC7E8]/40 flex items-center justify-between gap-4">
                                                    <div>
                                                        <div className="text-xs font-bold text-[#0B4778]">200 Feeds Live Now</div>
                                                        <div className="text-[11px] text-[#466071] mt-0.5">
                                                            Updated continuously from US & Canadian sources.
                                                        </div>
                                                    </div>
                                                    <div className="w-9 h-9 rounded-xl bg-[#4A9AD4] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                                                        <Percent className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Module 02: Engage */}
                            <div className="h-full flex items-center">
                                <Link 
                                    href="/engage" 
                                    className={`
                                        relative h-full flex items-center text-sm font-bold tracking-wide transition-all border-b-2 px-1
                                        ${isEngage 
                                            ? 'text-[#63B5E8] border-[#4A9AD4]' 
                                            : 'text-[#D5EBF8] border-transparent hover:text-white hover:border-[#63B5E8]'}
                                    `}
                                >
                                    <span>Engage</span>
                                </Link>
                            </div>

                            {/* Module 03: Value */}
                            <div className="h-full flex items-center">
                                <Link 
                                    href="/value" 
                                    className={`
                                        relative h-full flex items-center text-sm font-bold tracking-wide transition-all border-b-2 px-1
                                        ${isValue 
                                            ? 'text-[#63B5E8] border-[#4A9AD4]' 
                                            : 'text-[#D5EBF8] border-transparent hover:text-white hover:border-[#63B5E8]'}
                                    `}
                                >
                                    <span>Value</span>
                                </Link>
                            </div>

                            {/* Module 04: Social */}
                            <div className="h-full flex items-center">
                                <Link 
                                    href="/social" 
                                    className={`
                                        relative h-full flex items-center text-sm font-bold tracking-wide transition-all border-b-2 px-1
                                        ${isSocial 
                                            ? 'text-[#63B5E8] border-[#4A9AD4]' 
                                            : 'text-[#D5EBF8] border-transparent hover:text-white hover:border-[#63B5E8]'}
                                    `}
                                >
                                    <span>Social</span>
                                </Link>
                            </div>

                            {/* Module 05: Inspire */}
                            <div className="h-full flex items-center">
                                <Link 
                                    href="/inspire" 
                                    className={`
                                        relative h-full flex items-center text-sm font-bold tracking-wide transition-all border-b-2 px-1
                                        ${isInspire 
                                            ? 'text-[#63B5E8] border-[#4A9AD4]' 
                                            : 'text-[#D5EBF8] border-transparent hover:text-white hover:border-[#63B5E8]'}
                                    `}
                                >
                                    <span>Inspire</span>
                                </Link>
                            </div>
                        </nav>

                        {/* Admin Link & Mobile Button */}
                        <div className="flex items-center gap-3">
                            <Link 
                                href="/admin" 
                                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all"
                            >
                                <Layers className="w-3.5 h-3.5 text-[#63B5E8]" /> Admin Panel
                            </Link>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 focus:outline-hidden"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Page Viewport */}
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
};
