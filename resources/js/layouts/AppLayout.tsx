import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router, useForm } from '@inertiajs/react';
import { subcategoriesData } from '@/data/subcategories';
import { 
    BookOpen, 
    Sparkles, 
    Calculator, 
    MessageSquare, 
    Compass, 
    Menu, 
    X, 
    AlertCircle,
    CheckSquare,
    FileText,
    HelpCircle,
    Smartphone,
    Percent,
    User,
    Loader2,
    Home,
    Search,
    ShieldCheck,
    TrendingUp,
    Users,
    Star,
    Award,
    Zap,
    Building2,
    Laptop,
    PieChart,
    PlayCircle,
    Layers,
    DollarSign,
    Rss,
    Briefcase,
    Mail,
    Globe,
    Phone,
    MapPin,
    ArrowRight,
    CheckCircle2,
    Rocket,
    ChevronDown
} from 'lucide-react';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { url, props } = usePage();
    const { flash } = props as any;

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        email: '',
    });

    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [showAwards, setShowAwards] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [activeSubnav, setActiveSubnav] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isCityOpen, setIsCityOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/ideas', { q: searchQuery, l: locationQuery });
    };

    useEffect(() => {
        const dismissed = localStorage.getItem('bizztopia_awards_dismissed');
        if (!dismissed) {
            const timer = setTimeout(() => setShowAwards(true), 2500);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismissAwards = () => {
        localStorage.setItem('bizztopia_awards_dismissed', 'true');
        setShowAwards(false);
    };

    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: 'success' });
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setToast({ message: flash.error, type: 'error' });
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        post('/newsletter/subscribe', {
            preserveScroll: true,
            onSuccess: () => {
                reset('email');
            }
        });
    };

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageVisible, setPageVisible] = useState(true);
    const prevUrl = useRef(url);

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 120);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [pageLoading, setPageLoading] = useState(true);
    const [fadePreloader, setFadePreloader] = useState(false);
    useEffect(() => {
        const fadeTimer = setTimeout(() => setFadePreloader(true), 1400);
        const removeTimer = setTimeout(() => setPageLoading(false), 1900);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    // Track Inertia Page Navigation Events for Loading Bar + Page Transition
    useEffect(() => {
        const removeStartListener = router.on('start', () => {
            setIsLoading(true);
            setPageVisible(false);
        });
        const removeFinishListener = router.on('finish', () => {
            setIsLoading(false);
            // Small delay so the new page content renders before fade-in
            setTimeout(() => setPageVisible(true), 60);
        });

        return () => {
            removeStartListener();
            removeFinishListener();
        };
    }, []);

    // Trigger entrance on first load
    useEffect(() => { setPageVisible(true); }, []);

    const isHome = url === '/' || url.startsWith('/?') || url === '';
    const isIdeas = url.startsWith('/ideas');
    const isEngage = url.startsWith('/engage');
    const isValue = url.startsWith('/value');
    const isSocial = url.startsWith('/social');
    const isInspire = url.startsWith('/inspire');

    return (
        <>
            {/* Custom Toast Notification */}
            {toast && (
                <div 
                    className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3.5 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md max-w-sm"
                    style={{
                        animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }}
                >
                    <style>{`
                        @keyframes slideIn {
                            from { transform: translateX(100%); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                        }
                    `}</style>
                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-[#4A9AD4]">
                        {toast.type === 'success' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                            <AlertCircle className="w-4 h-4 text-rose-400 fill-rose-400/20" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-black font-outfit text-white leading-tight">
                            {toast.type === 'success' ? 'Success' : 'Error'}
                        </p>
                        <p className="text-[11px] text-slate-300 font-medium leading-snug mt-0.5">
                            {toast.message}
                        </p>
                    </div>
                    <button 
                        onClick={() => setToast(null)}
                        className="shrink-0 text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Full-Screen Premium Rocket Preloader Overlay */}
            {pageLoading && (
                <div className={`fixed inset-0 bg-[#031729] flex flex-col items-center justify-center z-[9999] transition-opacity duration-500 ease-out ${fadePreloader ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* Center 'B' favicon icon wrapper */}
                        <div className="absolute w-24 h-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl z-10">
                            <span 
                                className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#4A9AD4] to-[#287FBA]"
                                style={{ fontFamily: "'Galey Rounded', sans-serif !important" }}
                            >
                                B
                            </span>
                        </div>

                        {/* Orbiting Rocket track */}
                        <div className="absolute w-36 h-36 border border-[#287FBA]/20 rounded-full" />

                        {/* Orbiting Rocket container */}
                        <div className="absolute w-36 h-36 animate-spin" style={{ animationDuration: '3s', animationTimingFunction: 'linear' }}>
                            <div className="absolute -top-3.5 left-[calc(50%-14px)] transform rotate-45">
                                <Rocket className="w-7 h-7 text-[#4A9AD4] fill-[#4A9AD4] drop-shadow-[0_0_8px_#4A9AD4]" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-[#F7FAFC] text-[#102A3D] flex flex-col font-sans relative">
            {/* Animated Loading Top Progress Bar */}
            {isLoading && (
                <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-[#0B4778] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#287FBA] via-[#63B5E8] to-[#287FBA] animate-pulse w-full shadow-lg shadow-[#287FBA]/80" />
                </div>
            )}

            {/* Header Navigation — Consistent Yelp-style Brand Blue Bar */}
            <header className={`bg-[#0B4778] border-b border-[#287FBA]/20 text-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 shadow-2xl bg-[#031729]/95' : 'py-3.5 shadow-xl'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-6 shrink-0">
                        <Link href="/">
                            <img src="/images/logo.png" alt="Bizztopia" width="180" height="63" className="h-9 w-auto" />
                        </Link>
                    </div>
                    
                    {/* Center: Search Widget (Desktop) */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 hidden md:flex items-center bg-white p-1 rounded-xl shadow-md border border-slate-200">
                        <div className="flex-1 flex items-center gap-2 px-3 py-1 border-r border-slate-200">
                            <Search className="w-4 h-4 text-slate-400 shrink-0" />
                            <input 
                                type="text" 
                                placeholder="tenders, builders, marketing..." 
                                className="w-full text-slate-900 placeholder-slate-400 text-sm focus:outline-none bg-transparent font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-2 px-3 py-1">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                            <input 
                                type="text" 
                                placeholder="San Francisco, CA" 
                                className="w-full text-slate-900 placeholder-slate-400 text-sm focus:outline-none bg-transparent font-medium"
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                            />
                        </div>
                        <button type="submit" aria-label="Search" className="bg-[#287FBA] hover:bg-[#0B4778] text-white p-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center">
                            <Search className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4 text-sm font-bold text-white shrink-0">
                        <Link href="/write-a-review" className="hover:text-[#287FBA] transition-colors hidden lg:inline">Write a Review</Link>
                        <Link href="/for-consumers" className="hover:text-[#287FBA] transition-colors hidden lg:inline mr-2">Bizztopia for Consumers</Link>
                        <Link href="/value" className="hover:text-[#287FBA] transition-colors hidden lg:inline">For Businesses</Link>
                        <Link href="/login" className="px-3 py-1.5 rounded-lg border border-white hover:bg-white/10 transition-colors">Log In</Link>
                        <Link href="/register" className="px-3 py-1.5 rounded-lg bg-[#287FBA] hover:bg-[#0B4778] text-white transition-colors">Sign Up</Link>
                        
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Navigation Menu"
                            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Sub-Navigation Categories Line (Overlay below search row) */}
                <div className="border-t border-white/5 bg-[#0B4778]/50 hidden md:block relative mt-3" onMouseLeave={() => setActiveSubnav(null)}>
                    <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-8 text-xs font-bold text-slate-200/90">
                        {subcategoriesData.map((cat) => (
                            <button
                                key={cat.slug}
                                onMouseEnter={() => setActiveSubnav(cat.slug)}
                                className={`hover:text-[#287FBA] flex items-center gap-1.5 transition-colors cursor-pointer py-1 ${activeSubnav === cat.slug ? 'text-[#287FBA] border-b-2 border-[#287FBA]' : ''}`}
                            >
                                <cat.icon className="w-3.5 h-3.5 font-bold" /> {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Dropdown Card Overlay */}
                    {activeSubnav && (() => {
                        const activeCat = subcategoriesData.find(c => c.slug === activeSubnav);
                        if (!activeCat) return null;
                        return (
                            <div className="absolute top-full left-0 right-0 bg-white text-slate-900 border-b border-slate-200 shadow-2xl z-50 py-8 animate-in fade-in slide-in-from-top-1 duration-200">
                                <div className="max-w-7xl mx-auto px-10">
                                    <div className="grid grid-cols-3 gap-y-4 gap-x-12">
                                        {activeCat.subcategories.map((sub) => {
                                            const Icon = sub.icon;
                                            return (
                                                <Link
                                                    key={sub.slug}
                                                    href={`/subcategory/${sub.slug}`}
                                                    onClick={() => setActiveSubnav(null)}
                                                    className="flex items-center gap-3 py-1 text-sm font-bold text-slate-700 hover:text-[#287FBA] transition-colors group cursor-pointer"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#287FBA] transition-colors">
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span>{sub.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Mobile Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden px-6 py-4 bg-[#0B4778] border-t border-white/10 space-y-4 font-outfit">
                        {/* Mobile Search Widget */}
                        <form onSubmit={handleSearch} className="bg-white p-2 rounded-xl flex flex-col gap-2 border border-slate-200">
                            <div className="flex items-center gap-2 px-2 py-1.5 border-b border-slate-100">
                                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                                <input 
                                    type="text" 
                                    placeholder="tenders, builders, marketing..." 
                                    className="w-full text-slate-900 text-sm focus:outline-none bg-transparent"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 px-2 py-1.5">
                                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                <input 
                                    type="text" 
                                    placeholder="City or Zip" 
                                    className="w-full text-slate-900 text-sm focus:outline-none bg-transparent"
                                    value={locationQuery}
                                    onChange={(e) => setLocationQuery(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="bg-[#287FBA] hover:bg-[#0B4778] text-white py-2 rounded-lg font-bold transition-colors w-full">
                                Search
                            </button>
                        </form>
                        
                        <div className="flex flex-col gap-2.5">
                            <Link href="/write-a-review" className="block text-sm font-bold text-slate-200 hover:text-white">Write a Review</Link>
                            <Link href="/for-consumers" className="block text-sm font-bold text-slate-200 hover:text-white">Bizztopia for Consumers</Link>
                            <Link href="/value" className="block text-sm font-bold text-slate-200 hover:text-white">For Businesses</Link>
                            <Link href="/login" className="block text-sm font-bold text-slate-200 hover:text-white">Log In</Link>
                            <Link href="/register" className="block text-sm font-bold text-slate-200 hover:text-white">Sign Up</Link>
                        </div>
                    </div>
                )}
            </header>
            
            {/* Main Page Viewport — with smooth page transition */}
            <main
                className="flex-grow"
                style={{
                    opacity: pageVisible ? 1 : 0,
                    transform: pageVisible ? 'translateY(0)' : 'translateY(18px)',
                    transition: 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)',
                }}
            >
                {children}
            </main>

            {/* ════════════ B2B DIRECTORY INDEX (SEO pre-footer) ════════════ */}
            <section className="bg-[#F8FAFC] border-t border-slate-200/80 py-16 text-left">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Left Column: Rich Directory Categories (8 cols) */}
                        <div className="lg:col-span-8 space-y-6">
                            <h3 className="text-sm font-black font-outfit text-slate-900 uppercase tracking-wider border-b-2 border-[#0B4778] pb-2">
                                Search by category to find your growth team
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-4 text-xs font-semibold text-slate-600">
                                {[
                                    { label: 'Marketing Agencies', href: '/?q=marketing' },
                                    { label: 'SaaS & B2B Software', href: '/?q=saas' },
                                    { label: 'Management Consulting', href: '/?q=consulting' },
                                    { label: 'Business Legal Advisors', href: '/?q=legal' },
                                    { label: 'IT & Software Development', href: '/?q=development' },
                                    { label: 'Creative & Design Studios', href: '/?q=design' },
                                    { label: 'SEO & Content Agencies', href: '/?q=seo' },
                                    { label: 'HR & Recruitment Firms', href: '/?q=hr' },
                                    { label: 'Sales & Cold Outreach', href: '/?q=sales' },
                                    { label: 'Cloud Infrastructure & DevOps', href: '/?q=cloud' },
                                    { label: 'Cyber Security Consultants', href: '/?q=security' },
                                    { label: 'Product Management Agencies', href: '/?q=product' },
                                    { label: 'Video Production & Creative', href: '/?q=video' },
                                    { label: 'Public Relations & Comms', href: '/?q=pr' },
                                    { label: 'Customer Support Services', href: '/?q=support' },
                                    { label: 'Financial Auditing & Taxes', href: '/?q=finance' },
                                    { label: 'Growth Hacking Specialists', href: '/?q=growth' },
                                    { label: 'Lead Generation Agencies', href: '/?q=lead' }
                                ].map((item) => (
                                    <Link key={item.label} href={item.href} className="hover:text-[#287FBA] hover:underline transition-all">
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Tools, Ideas, Forums (4 cols) */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Find the Best Vendors */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-black font-outfit text-[#0B4778] uppercase tracking-wider border-b border-slate-200 pb-1">
                                    Find the Best B2B Partners
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Bizztopia offers the largest directory of local and remote B2B service providers in the U.S. and Canada, with over 3 million verified ratings.
                                </p>
                                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-bold text-slate-700">
                                    <Link href="/?q=marketing" className="hover:text-[#287FBA] hover:underline">Marketing Agencies</Link>
                                    <span>·</span>
                                    <Link href="/?q=saas" className="hover:text-[#287FBA] hover:underline">SaaS Platforms</Link>
                                    <span>·</span>
                                    <Link href="/?q=consulting" className="hover:text-[#287FBA] hover:underline">Business Consultants</Link>
                                </div>
                            </div>

                            {/* Growth Planning Tools */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-black font-outfit text-[#0B4778] uppercase tracking-wider border-b border-slate-200 pb-1">
                                    Easy-to-Use Growth Tools
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Stay organized and project your conversion lift and budget payback from start to finish.
                                </p>
                                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-bold text-slate-700">
                                    <Link href="/value" className="hover:text-[#287FBA] hover:underline">ROI & Payback Estimator</Link>
                                    <span>·</span>
                                    <Link href="/value" className="hover:text-[#287FBA] hover:underline">Startup Cost Calculator</Link>
                                    <span>·</span>
                                    <Link href="/value" className="hover:text-[#287FBA] hover:underline">Vetting Checklist</Link>
                                </div>
                            </div>

                            {/* Advice from Community */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-black font-outfit text-[#0B4778] uppercase tracking-wider border-b border-slate-200 pb-1">
                                    Advice & Community
                                </h4>
                                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-bold text-slate-700">
                                    <Link href="/social" className="hover:text-[#287FBA] hover:underline">Founder Forums</Link>
                                    <span>·</span>
                                    <Link href="/social" className="hover:text-[#287FBA] hover:underline">Verified Reviews</Link>
                                    <span>·</span>
                                    <Link href="/ideas" className="hover:text-[#287FBA] hover:underline">Ideas & Strategy Guides</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Paragraph: Why Bizztopia Description (SEO Content) */}
                    <div className="mt-12 pt-8 border-t border-slate-200 space-y-4">
                        <h4 className="text-xs font-black font-outfit text-[#0B4778] uppercase tracking-wider">
                            Why Bizztopia?
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            With North America's premier directory of verified local trades, consumer services, and B2B growth vendors, Bizztopia provides the most comprehensive business discovery platform available. Whether you are searching for top-rated Auto Repair specialists, trusted Home &amp; Garden contractors, local Restaurants, Health &amp; Medical providers, or specialized B2B Marketing and Legal partners, Bizztopia enables you to search and sort by location, budget, verified credentials, and customer rating scores across every major city.
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            In addition to verified vendor profiles and transparent pricing quotes, Bizztopia offers free interactive business tools including custom ROI calculators, vetting checklists, and verified customer review ecosystems. Stay informed on-the-go with our mobile-optimized portal, featuring daily market intelligence, industry growth playbooks, and curated case studies from our dedicated editorial desk. Bizztopia empowers consumers and business leaders alike to connect with confidence and turn their goals into reality!
                        </p>
                    </div>
                </div>
            </section>

            {/* ════════════ BIZZTOPIA FOOTER ════════════ */}
            <footer className="border-t border-slate-200">

                {/* Top Newsletter Strip in Bizztopia Blue */}
                <div className="bg-[#0B4778] text-white py-10 px-6 border-b border-white/10">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="space-y-1 text-center lg:text-left">
                            <span className="text-[10px] font-black tracking-widest uppercase text-[#8FC7E8] block">
                                Bizztopia Intelligence Digest
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black font-outfit text-white">
                                Stay ahead of the local business market. Free weekly insights.
                            </h3>
                        </div>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                            <div className="flex w-full">
                                <input 
                                    type="email" 
                                    placeholder="Your business email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-300 text-xs px-4 py-3 rounded-l-xl focus:outline-none focus:border-[#287FBA]"
                                />
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-[#287FBA] hover:bg-[#0B4778] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-r-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                                >
                                    <span>{processing ? '...' : 'Subscribe'}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            {errors.email && (
                                <span className="text-[11px] text-red-300 font-bold text-left block">
                                    {errors.email}
                                </span>
                            )}
                            {(wasSuccessful || flash?.success) && (
                                <span className="text-[11px] text-emerald-300 font-bold text-left block">
                                    ✓ {flash?.success || 'Subscribed successfully!'}
                                </span>
                            )}
                        </form>
                    </div>
                </div>

                {/* Exact Yelp 5-Column Footer Grid (Clean Light Aesthetic from Screenshot) */}
                <div className="bg-[#F7F7F7] text-slate-800 py-16 px-6 sm:px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-[13px]">
                        
                        {/* Col 1: About */}
                        <div className="space-y-3">
                            <h4 className="text-[15px] font-bold text-slate-900 font-outfit">About</h4>
                            <div className="flex flex-col space-y-2">
                                <Link href="/about" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">About Bizztopia</Link>
                                <Link href="/careers" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Careers</Link>
                                <Link href="/press" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Press</Link>
                                <Link href="/about#investors" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Investor Relations</Link>
                                <Link href="/trust-safety" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Trust & Safety</Link>
                                <Link href="/trust-safety#guidelines" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Content Guidelines</Link>
                                <Link href="/terms#accessibility" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Accessibility Statement</Link>
                                <Link href="/terms" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Terms of Service</Link>
                                <Link href="/privacy" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Privacy Policy</Link>
                                <Link href="/privacy#ad-choices" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Ad Choices</Link>
                                <Link href="/privacy#privacy-choices" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Your Privacy Choices</Link>
                            </div>
                        </div>

                        {/* Col 2: Discover */}
                        <div className="space-y-3">
                            <h4 className="text-[15px] font-bold text-slate-900 font-outfit">Discover</h4>
                            <div className="flex flex-col space-y-2">
                                <Link href="/value" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Bizztopia Project Cost Guides</Link>
                                <Link href="/inspire" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Collections</Link>
                                <Link href="/social" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Talk</Link>
                                <Link href="/subcategory/venues-events" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Events</Link>
                                <Link href="/ideas" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Bizztopia Blog</Link>
                                <Link href="/contact" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Support</Link>
                                <Link href="/for-consumers" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Bizztopia Mobile</Link>
                                <Link href="/about#developers" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Developers</Link>
                                <Link href="/ideas#rss" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">RSS</Link>
                            </div>
                        </div>

                        {/* Col 3: For Businesses */}
                        <div className="space-y-3">
                            <h4 className="text-[15px] font-bold text-slate-900 font-outfit">For Businesses</h4>
                            <div className="flex flex-col space-y-2">
                                <Link href="/value" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">For Businesses</Link>
                                <Link href="/login" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Business Owner Login</Link>
                                <Link href="/value#claim" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Claim your Business Page</Link>
                                <Link href="/value#pricing" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Advertise on Bizztopia</Link>
                                <Link href="/subcategory/takeout" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Bizztopia for Restaurant Owners</Link>
                                <Link href="/value#guest-manager" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Table & Guest Manager</Link>
                                <Link href="/ideas" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Business Resources</Link>
                                <Link href="/contact" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Business Support</Link>
                                <Link href="/subcategory/contractors-handymen" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Marketing & Advertising Agencies</Link>
                                <Link href="/value#roi-calculator" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Bizztopia Data for B2B</Link>
                                <Link href="/for-consumers" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Bizztopia Data for B2C</Link>
                                <Link href="/about#ai" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Agentic AI</Link>
                            </div>
                        </div>

                        {/* Col 4: RepairPal */}
                        <div className="space-y-3">
                            <h4 className="text-[15px] font-bold text-slate-900 font-outfit">RepairPal</h4>
                            <div className="flex flex-col space-y-2">
                                <Link href="/subcategory/auto-repair" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">RepairPal Home</Link>
                                <Link href="/subcategory/auto-repair" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Auto Repair Near Me</Link>
                                <Link href="/subcategory/auto-repair" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Car Repair Estimates</Link>
                                <Link href="/subcategory/oil-change" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Auto Safety Recalls</Link>
                                <Link href="/subcategory/body-shops" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Symptom Guides</Link>
                                <Link href="/subcategory/auto-detailing" className="text-slate-600 hover:text-[#287FBA] hover:underline font-normal">Common Problems</Link>
                            </div>
                        </div>

                        {/* Col 5: Languages & Cities */}
                        <div className="space-y-6">
                            {/* Languages */}
                            <div className="space-y-2 relative">
                                <h4 className="text-[15px] font-bold text-slate-900 font-outfit">Languages</h4>
                                <div className="relative inline-block">
                                    <button 
                                        type="button"
                                        onClick={() => setIsLangOpen(!isLangOpen)}
                                        className="text-slate-600 hover:text-[#287FBA] flex items-center gap-1 font-medium transition-colors cursor-pointer"
                                    >
                                        <span>{selectedLanguage}</span>
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </button>

                                    {isLangOpen && (
                                        <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs font-semibold text-slate-700">
                                            {['English', 'English (UK)', 'Español', 'Français', 'Deutsch'].map(lang => (
                                                <button
                                                    key={lang}
                                                    type="button"
                                                    onClick={() => { setSelectedLanguage(lang); setIsLangOpen(false); }}
                                                    className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 hover:text-[#287FBA] transition-colors"
                                                >
                                                    {lang}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Cities */}
                            <div className="space-y-2 relative">
                                <h4 className="text-[15px] font-bold text-slate-900 font-outfit">Cities</h4>
                                <div className="relative inline-block">
                                    <button 
                                        type="button"
                                        onClick={() => setIsCityOpen(!isCityOpen)}
                                        className="text-slate-600 hover:text-[#287FBA] flex items-center gap-1 font-medium transition-colors cursor-pointer"
                                    >
                                        <span>Explore a City</span>
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </button>

                                    {isCityOpen && (
                                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs font-semibold text-slate-700">
                                            {[
                                                { name: 'San Francisco, CA', slug: 'San Francisco' },
                                                { name: 'New York, NY', slug: 'New York' },
                                                { name: 'Los Angeles, CA', slug: 'Los Angeles' },
                                                { name: 'Chicago, IL', slug: 'Chicago' },
                                                { name: 'Houston, TX', slug: 'Houston' },
                                                { name: 'Dallas, TX', slug: 'Dallas' },
                                                { name: 'Miami, FL', slug: 'Miami' },
                                                { name: 'Atlanta, GA', slug: 'Atlanta' },
                                            ].map(city => (
                                                <Link
                                                    key={city.slug}
                                                    href={`/ideas?city=${encodeURIComponent(city.slug)}`}
                                                    onClick={() => setIsCityOpen(false)}
                                                    className="block px-3.5 py-1.5 hover:bg-slate-50 hover:text-[#287FBA] transition-colors"
                                                >
                                                    {city.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Trust badges strip */}
                            <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs text-slate-500">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-[#287FBA]" />
                                    <span className="font-bold">Verified License Audits</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-[#287FBA] fill-[#287FBA]" />
                                    <span className="font-bold">Fraud-Free Client Reviews</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Copyright and Social Strip */}
                    <div className="max-w-7xl mx-auto border-t border-slate-200/80 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                        <p className="m-0 text-center sm:text-left">
                            Copyright © 2026 Bizztopia Inc. Bizztopia, the Bizztopia logo, and related marks are registered trademarks of Bizztopia.
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {[
                                { label: 'Twitter', href: '#', svg: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                                { label: 'LinkedIn', href: '#', svg: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                                { label: 'Facebook', href: '#', svg: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                                { label: 'Instagram', href: '#', svg: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> }
                            ].map(({ label, href, svg }) => (
                                <a 
                                    key={label} 
                                    href={href} 
                                    aria-label={label}
                                    className="w-7 h-7 rounded-lg bg-slate-200/80 hover:bg-[#287FBA] text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                                >
                                    {svg}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </footer>

            {/* Floating Choice Awards 2026 Banner */}
            {showAwards && (
                <div 
                    className="fixed bottom-6 left-6 z-[9998] bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 flex flex-col sm:flex-row items-center gap-6 max-w-2xl animate-in slide-in-from-bottom-5 duration-500 ease-out"
                    style={{
                        animation: 'awardsSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }}
                >
                    <style>{`
                        @keyframes awardsSlideUp {
                            from { transform: translateY(100%); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                    `}</style>

                    {/* Close Button */}
                    <button 
                        onClick={dismissAwards}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-50 rounded-lg cursor-pointer"
                        title="Dismiss"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* Left: Gold Badge */}
                    <div className="shrink-0 w-24 h-24 bg-white border-2 border-[#287FBA] rounded-xl p-2 flex flex-col items-center justify-between text-center shadow-xs relative overflow-hidden select-none">
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#287FBA] leading-none mt-0.5">Bizztopia</span>
                        <div className="flex flex-col items-center leading-none">
                            <span className="text-[7px] font-black uppercase text-slate-400 leading-none">Clients' Choice</span>
                            <span className="text-[9px] font-black uppercase text-slate-900 tracking-tight leading-none mt-0.5">Awards</span>
                        </div>
                        <div className="flex gap-0.5 justify-center py-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-2 h-2 fill-[#287FBA] text-[#287FBA]" />
                            ))}
                        </div>
                        <div className="bg-[#287FBA] text-white font-black text-[9px] px-2 py-0.5 rounded-md leading-none w-full">
                            2026
                        </div>
                    </div>

                    {/* Center: Text */}
                    <div className="flex-1 text-center sm:text-left pr-4">
                        <h4 className="text-base sm:text-lg font-black font-outfit text-slate-900 tracking-tight leading-tight">
                            The best vendors of 2026
                        </h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                            This year's best local pros, rated by clients like you.
                        </p>
                    </div>

                    {/* Right: CTA Button */}
                    <div className="shrink-0">
                        <Link 
                            href="/ideas" 
                            className="inline-flex items-center justify-center bg-[#008B9B] hover:bg-[#007684] text-white font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-lg scale-100 hover:scale-101 whitespace-nowrap cursor-pointer"
                        >
                            Check them out
                        </Link>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};
