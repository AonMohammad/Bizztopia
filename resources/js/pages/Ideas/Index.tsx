import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { 
    BookOpen, 
    Search, 
    RefreshCw, 
    Globe, 
    Rss,
    FileText,
    Sparkles,
    ArrowRight,
    Compass,
    TrendingUp,
    Clock,
    User,
    ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { AdSpaceBanner } from '@/components/ui/AdSpaceBanner';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    hero_image?: string;
    reading_time?: string;
    published_at?: string;
    view_count?: number;
    source_rss_name?: string;
    category?: {
        id: number;
        name: string;
        slug: string;
    };
    author?: {
        name: string;
        role_title?: string;
    };
}

interface IdeasIndexProps {
    articles: {
        data: Article[];
        links?: any[];
        meta?: any;
    };
    categories: any[];
    editorialBoards?: any[];
    filters: {
        search?: string;
        category?: string;
        type?: string;
    };
    region?: string;
}

const cleanExcerpt = (art?: Article, length: number = 140) => {
    if (!art) return '';
    if (art.excerpt && art.excerpt.trim().length > 0) {
        return art.excerpt.replace(/<[^>]*>?/gm, '').trim();
    }
    if (!art.content) return '';
    const plainText = art.content
        .replace(/<[^>]*>?/gm, ' ')
        .replace(/&[a-z0-9#]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
};

export default function Index({ 
    articles, 
    categories = [], 
    editorialBoards = [], 
    filters, 
    region 
}: IdeasIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [syncing, setSyncing] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/ideas', { ...filters, search, page: 1 }, { preserveState: true });
    };

    const handleTypeFilter = (type: string) => {
        router.get('/ideas', { ...filters, type: type || undefined, page: 1 }, { preserveState: true });
    };

    const handleSyncRss = () => {
        setSyncing(true);
        router.post('/admin/sync-rss', {}, {
            onFinish: () => setSyncing(false),
        });
    };

    const allArticles = articles.data || [];
    const isFiltered = Boolean(filters.search || filters.category || filters.type);

    // KPNews Article Segmentations
    const heroArticle = allArticles[0];
    const latestSidebar4 = allArticles.slice(1, 5);
    const trending6 = allArticles.slice(5, 11);
    const wideFeature = allArticles[11] || allArticles[0];
    const inBrief5 = allArticles.slice(12, 17);
    const gridRow1 = allArticles.slice(17, 20);
    const gridRow2 = allArticles.slice(20, 23);
    const categoryGroup1 = allArticles.slice(23, 27);
    const categoryGroup2 = allArticles.slice(27, 31);

    const tickers = [
        { name: 'S&P 500', val: '6,101.24', change: '+0.43%', up: true },
        { name: 'NASDAQ', val: '19,868.38', change: '+0.02%', up: true },
        { name: 'DOW JONES', val: '44,860.31', change: '+0.43%', up: true },
        { name: 'FTSE 100', val: '8,615.93', change: '-0.04%', up: false },
        { name: 'DAX', val: '23,380.75', change: '+1.27%', up: true },
        { name: 'BRENT', val: '$76.41', change: '+2.05%', up: true },
        { name: 'GOLD', val: '$3,203.20', change: '-0.22%', up: false },
    ];

    const subTabs = [
        { label: 'All Ideas Boards', value: '' },
        { label: 'Market News', value: 'News' },
        { label: 'Blogs', value: 'Blog' },
        { label: 'Industry Guides', value: 'Guide' },
        { label: 'Tips & Tricks', value: 'Checklist' },
        { label: 'How-To Manuals', value: 'HowTo' },
    ];

    return (
        <AppLayout>
            <Head title="Ideas & Market Intelligence — Bizztopia Business News" />

            <div className="bg-white text-slate-900 font-sans min-h-screen">
                
                {/* ══════════════════════ KPNews Header & Filter Bar ══════════════════════ */}
                <header className="border-b border-slate-200 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-4">
                            <div>
                                <span className="text-[10px] font-black tracking-widest text-[#287FBA] uppercase block">
                                    KPNews Intelligence Bureau
                                </span>
                                <h1 className="text-3xl md:text-4xl font-black font-outfit text-slate-950 tracking-tight">
                                    Ideas & Business Market Newspaper
                                </h1>
                            </div>

                            {/* Search Box */}
                            <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-md w-full">
                                <div className="relative flex-1">
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="text"
                                        placeholder="Search KPNews stories, market trends..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#287FBA]"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-[#287FBA] text-white text-xs font-bold rounded-xl hover:bg-[#1f689a] transition-all cursor-pointer font-outfit"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Category Navigation Bar */}
                        <div className="flex items-center gap-2 pt-4 overflow-x-auto no-scrollbar">
                            {subTabs.map((tab) => {
                                const isActive = (filters.type === tab.value) || (!filters.type && tab.value === '');
                                return (
                                    <button
                                        key={tab.value}
                                        onClick={() => handleTypeFilter(tab.value)}
                                        className={`
                                            px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider font-outfit cursor-pointer
                                            ${isActive 
                                                ? 'bg-slate-950 text-white shadow-xs' 
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'}
                                        `}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </header>

                {/* ══════════════════════ MARKETS TICKER BAR ══════════════════════ */}
                <div className="bg-slate-950 text-white py-2.5 overflow-hidden border-t border-b border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 overflow-x-auto no-scrollbar text-xs font-mono">
                        <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase shrink-0 font-outfit">
                            MARKETS
                        </span>
                        {tickers.map((t) => (
                            <div key={t.name} className="flex items-center gap-2 shrink-0">
                                <span className="text-slate-400 font-medium">{t.name}</span>
                                <span className="font-bold text-white">{t.val}</span>
                                <span className={t.up ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                    {t.change}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
                    
                    {/* ══════════════════════ HERO + LATEST SIDEBAR (KPNews Split) ══════════════════════ */}
                    {heroArticle && (
                        <section className="border-b border-slate-200 pb-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                
                                {/* Hero Main Feature (Left 8 Cols) */}
                                <div className="lg:col-span-8 lg:border-r lg:border-slate-200 lg:pr-8 space-y-4">
                                    <Link href={`/ideas/${heroArticle.slug}`} className="group block space-y-4">
                                        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 relative">
                                            <img 
                                                src={heroArticle.hero_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'} 
                                                alt={heroArticle.title}
                                                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black tracking-widest text-[#287FBA] uppercase font-outfit">
                                                {heroArticle.category?.name || 'FEATURED STORY'}
                                            </span>
                                            <h2 className="text-2xl sm:text-3xl font-black font-outfit text-slate-950 group-hover:text-[#287FBA] transition-colors leading-tight">
                                                {heroArticle.title}
                                            </h2>
                                            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed font-sans">
                                                {cleanExcerpt(heroArticle, 220)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 font-medium">
                                            <span>{heroArticle.author?.name || 'KPNews Intelligence'}</span>
                                            <span>•</span>
                                            <span>{heroArticle.reading_time || '6 min read'}</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Latest Sidebar (Right 4 Cols) */}
                                <div className="lg:col-span-4 space-y-4">
                                    <div className="flex items-center justify-between border-b-2 border-slate-950 pb-1.5">
                                        <span className="text-xs font-black tracking-widest text-slate-950 uppercase font-outfit">
                                            LATEST STORIES
                                        </span>
                                        <Link href="/ideas" className="text-[11px] font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider font-outfit">
                                            More →
                                        </Link>
                                    </div>

                                    <div className="divide-y divide-slate-100">
                                        {latestSidebar4.map((art) => (
                                            <Link 
                                                key={art.id} 
                                                href={`/ideas/${art.slug}`} 
                                                className="group flex gap-3 py-3.5 items-start"
                                            >
                                                <div className="w-20 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                                    <img 
                                                        src={art.hero_image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'} 
                                                        alt={art.title} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.onerror = null;
                                                            target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 space-y-1">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block font-outfit">
                                                        {art.category?.name || 'Insight'}
                                                    </span>
                                                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#287FBA] transition-colors line-clamp-2 leading-snug font-outfit">
                                                        {art.title}
                                                    </h3>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ══════════════════════ TRENDING NOW (3-Column Grid) ══════════════════════ */}
                    {trending6.length > 0 && (
                        <section className="border-b border-slate-200 pb-10 space-y-6">
                            <div className="flex items-center justify-between border-b-2 border-slate-950 pb-1.5">
                                <span className="text-xs font-black tracking-widest text-slate-950 uppercase font-outfit">
                                    TRENDING NOW
                                </span>
                                <span className="text-xs font-semibold text-slate-400 font-outfit">
                                    Verified Market Intelligence
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {trending6.map((art) => (
                                    <Link 
                                        key={art.id} 
                                        href={`/ideas/${art.slug}`} 
                                        className="group block space-y-3"
                                    >
                                        <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
                                            <img 
                                                src={art.hero_image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'} 
                                                alt={art.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80';
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-[9px] font-black text-[#287FBA] uppercase tracking-wider block font-outfit">
                                                {art.category?.name || 'TRENDING'}
                                            </span>
                                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#287FBA] transition-colors line-clamp-2 leading-snug font-outfit">
                                                {art.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
                                                {cleanExcerpt(art, 110)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SPONSOR AD BANNER */}
                    <AdSpaceBanner adType="google_ads" />

                    {/* ══════════════════════ WIDE FEATURE + IN BRIEF (KPNews Numbered List) ══════════════════════ */}
                    {wideFeature && (
                        <section className="border-b border-slate-200 pb-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                
                                {/* Wide Feature Left (7 Cols) */}
                                <div className="lg:col-span-7 lg:border-r lg:border-slate-200 lg:pr-8 space-y-4">
                                    <div className="flex items-center justify-between border-b-2 border-slate-950 pb-1.5 mb-4">
                                        <span className="text-xs font-black tracking-widest text-slate-950 uppercase font-outfit">
                                            IN-DEPTH ANALYSIS
                                        </span>
                                    </div>
                                    <Link href={`/ideas/${wideFeature.slug}`} className="group block space-y-3">
                                        <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
                                            <img 
                                                src={wideFeature.hero_image || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'} 
                                                alt={wideFeature.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80';
                                                }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-[#287FBA] uppercase tracking-wider block font-outfit">
                                            {wideFeature.category?.name || 'SPECIAL REPORT'}
                                        </span>
                                        <h2 className="text-xl font-bold font-outfit text-slate-950 group-hover:text-[#287FBA] transition-colors leading-tight">
                                            {wideFeature.title}
                                        </h2>
                                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
                                            {cleanExcerpt(wideFeature, 160)}
                                        </p>
                                    </Link>
                                </div>

                                {/* In Brief Numbered List Right (5 Cols) */}
                                <div className="lg:col-span-5 space-y-4">
                                    <div className="flex items-center justify-between border-b-2 border-slate-950 pb-1.5">
                                        <span className="text-xs font-black tracking-widest text-slate-950 uppercase font-outfit">
                                            IN BRIEF
                                        </span>
                                    </div>

                                    <div className="space-y-3 divide-y divide-slate-100">
                                        {inBrief5.map((art, idx) => (
                                            <Link 
                                                key={art.id} 
                                                href={`/ideas/${art.slug}`} 
                                                className="group flex gap-4 pt-3 items-start"
                                            >
                                                <span className="text-2xl font-black text-slate-300 group-hover:text-[#287FBA] transition-colors font-outfit w-8 text-right shrink-0">
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                                <div className="flex-1 min-w-0 space-y-1">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block font-outfit">
                                                        {art.category?.name || 'Brief'}
                                                    </span>
                                                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#287FBA] transition-colors line-clamp-2 leading-snug font-outfit">
                                                        {art.title}
                                                    </h3>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ══════════════════════ EDITORIAL GRID ROW (3 Columns) ══════════════════════ */}
                    {gridRow1.length > 0 && (
                        <section className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {gridRow1.map((art) => (
                                    <Link 
                                        key={art.id} 
                                        href={`/ideas/${art.slug}`} 
                                        className="group block space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-[#287FBA]/40 transition-all"
                                    >
                                        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
                                            <img 
                                                src={art.hero_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'} 
                                                alt={art.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
                                                }}
                                            />
                                        </div>
                                        <span className="text-[9px] font-black text-[#287FBA] uppercase tracking-wider block font-outfit">
                                            {art.category?.name || 'EDITORIAL'}
                                        </span>
                                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#287FBA] transition-colors line-clamp-2 leading-snug font-outfit">
                                            {art.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
                                            {cleanExcerpt(art, 90)}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                </main>
            </div>
        </AppLayout>
    );
}
