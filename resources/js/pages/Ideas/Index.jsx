import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { EngagePromoUnit } from '@/components/ui/EngagePromoUnit';
import { MovingChainRow } from '@/components/ui/MovingChainRow';
import { NewspaperGridSection } from '@/components/ui/NewspaperGridSection';
import { AdSpaceBanner } from '@/components/ui/AdSpaceBanner';
import { 
    BookOpen, 
    Search, 
    RefreshCw, 
    Globe, 
    Rss,
    FileText,
    CheckSquare,
    HelpCircle,
    Sparkles,
    ArrowRight,
    Compass,
    Newspaper,
    Layers,
    Flame,
    Zap
} from 'lucide-react';

export default function Index({ articles, categories, editorialBoards = [], filters, region }) {
    const [search, setSearch] = useState(filters.search || '');
    const [syncing, setSyncing] = useState(false);

    const subTabs = [
        { label: 'All Ideas Boards', value: '' },
        { label: 'Market News', value: 'News' },
        { label: 'Blogs', value: 'Blog' },
        { label: 'Industry Guides', value: 'Industry Guide' },
        { label: 'Tips & Tricks', value: 'Tips & Tricks' },
        { label: 'How-To Articles', value: 'How-To' },
        { label: 'Checklists', value: 'Checklist' },
        { label: 'Guides', value: 'Guide' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/ideas', { ...filters, search }, { preserveState: true });
    };

    const handleTypeFilter = (type) => {
        router.get('/ideas', { ...filters, type: type || '' }, { preserveState: true });
    };

    const handleSyncRss = () => {
        setSyncing(true);
        router.post('/ideas/sync-rss', {}, {
            onFinish: () => setSyncing(false),
        });
    };

    // Filter articles for breaking news chain (is_breaking or top news)
    const breakingArticles = articles.data.filter(a => a.is_breaking || a.content_type === 'News').slice(0, 15);

    // Filter articles for trending intelligence chain (is_trending or highest view_count)
    const trendingArticles = [...articles.data]
        .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
        .slice(0, 15);

    // Unique article assignment tracking so NO section ever repeats the same articles
    const usedArticleIds = new Set();
    
    const getArticlesForBoard = (boardFilter, boardIndex) => {
        let candidatePool = articles.data.filter(a => !usedArticleIds.has(a.id));
        
        if (boardFilter) {
            const categoryPool = candidatePool.filter(a => a.content_type === boardFilter);
            if (categoryPool.length >= 4) {
                candidatePool = categoryPool;
            }
        }
        
        const selected = candidatePool.slice(0, 8);
        selected.forEach(a => usedArticleIds.add(a.id));
        return selected;
    };

    // Filtered mode check
    const isFiltered = Boolean(filters.type || filters.search || filters.category);

    // Distinct Category Section Headings (No Repetition within category)
    const categoryHeadingsMap = {
        'News': [
            'Top Market Headlines & Capital Access',
            'Regulatory & Compliance News Digest',
            'Tech Funding & B2B SaaS Investments',
            'Macroeconomic & Trade Intelligence'
        ],
        'Blog': [
            'Founders Leadership & AEO Strategy Blogs',
            'Customer Acquisition & CAC Minimization',
            'Reputation & Conversion Optimization',
            'Scalable Digital Infrastructure Stories'
        ],
        'Industry Guide': [
            'Enterprise Benchmark & Analysis Reports',
            'State-by-State Legal & Formation Blueprints',
            'AEO Search Engine Indexing Manuals',
            'Remote Workforce & Operations Frameworks'
        ],
        'Tips & Tricks': [
            'Rapid CAC Optimization Tactics',
            'High-Converting Interactive Calculator Hacks',
            'Review Verification & Social Proof Hacks',
            'AEO & Schema Data Quick Wins'
        ],
        'How-To': [
            'Step-by-Step Acquisition Widget Blueprints',
            'RSS Data Automation & Classification Guides',
            'Schema Metadata & Search Indexing Tutorials',
            'Showroom Gallery & Dynamic UI Tutorials'
        ],
        'Checklist': [
            'Startup Legal & Tax Formation Checklists',
            'AEO Search Indexing Compliance Audits',
            'Data Security & SAIF Protocol Checklists',
            'Conversion Optimization & NPS Audits'
        ],
        'Guide': [
            'Master Growth & Value Acquisition Playbooks',
            'Decoupled Platform Architecture Manuals',
            'North American Market Expansion Blueprints',
            'High-Ticket B2B Conversion Manuals'
        ],
        'Default': [
            'Top Headlines & Strategic Insights',
            'Industry In-Depth Analysis',
            'Spotlight & Market Digest',
            'Market Intelligence & Frameworks'
        ]
    };

    // Split filtered articles into 8-item chunks for subcategory BBC News layouts
    const filteredChunks = [];
    if (isFiltered && articles.data.length > 0) {
        const layoutTypes = ['hero_split', '4_column_masonry', 'spotlight_digest', 'market_grid'];
        const adTypes = ['google_ads', 'engage_poll', 'google_ads', 'engage_quiz'];
        const headingsList = categoryHeadingsMap[filters.type] || categoryHeadingsMap['Default'];
        
        for (let i = 0; i < articles.data.length; i += 8) {
            const chunkIndex = Math.floor(i / 8);
            filteredChunks.push({
                articles: articles.data.slice(i, i + 8),
                layoutType: layoutTypes[chunkIndex % layoutTypes.length],
                adType: adTypes[chunkIndex % adTypes.length],
                boardName: headingsList[chunkIndex % headingsList.length],
            });
        }
    }

    return (
        <AppLayout>
            <Head title="Ideas — Business Knowledge & Editorial Newspaper Boards" />

            {/* Ideas Portal Hero Header */}
            <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-hero text-white border-b border-[#0B4778]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="max-w-2xl space-y-4">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-white tracking-tight leading-tight">
                                Business Ideas & Editorial Newspaper Boards
                            </h1>

                            <p className="text-sm sm:text-base text-[#D5EBF8] leading-relaxed max-w-xl">
                                Non-overlapping BBC News-style editorial grid boards interleaved with Google Ads and Engage interactive spaces. Fully manageable from the admin backend.
                            </p>
                        </div>

                        {/* Search & Sync Widget */}
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl max-w-md w-full space-y-4">
                            <form onSubmit={handleSearch} className="space-y-3">
                                <div className="relative">
                                    <Search className="w-4 h-4 text-[#8FC7E8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="text"
                                        placeholder="Search editorial stories, topics, keywords..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-[#041E34]/80 border border-[#8FC7E8]/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#8FC7E8]/70 focus:outline-none focus:border-[#63B5E8]"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button type="submit" variant="primary" size="sm" className="w-full font-bold">
                                        Search Editorial
                                    </Button>
                                </div>
                            </form>

                            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#D5EBF8]">
                                <div className="flex items-center gap-1.5 font-bold">
                                    <Rss className="w-4 h-4 text-[#63B5E8]" />
                                    <span>210 Feeds Loaded</span>
                                </div>
                                <button 
                                    onClick={handleSyncRss} 
                                    disabled={syncing}
                                    className="text-[#63B5E8] hover:text-white font-bold flex items-center gap-1 hover:underline disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                                    <span>{syncing ? 'Syncing...' : 'Sync RSS'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subcategory Filter Navigation Bar */}
            <section className="bg-white border-b border-[#E6EEF3] sticky top-20 z-30 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-3 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-2 shrink-0">
                            {subTabs.map((tab) => {
                                const isActive = (filters.type === tab.value) || (!filters.type && tab.value === '');
                                return (
                                    <button
                                        key={tab.value}
                                        onClick={() => handleTypeFilter(tab.value)}
                                        className={`
                                            px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0
                                            ${isActive 
                                                ? 'bg-[#287FBA] text-white shadow-xs scale-[1.02]' 
                                                : 'bg-[#F4FAFE] text-[#466071] hover:bg-[#EAF5FC] hover:text-[#102A3D]'}
                                        `}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        <Link 
                            href="/admin/boards" 
                            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-amber-400 text-xs font-bold shrink-0 hover:bg-slate-800 transition-colors"
                        >
                            <Layers className="w-3.5 h-3.5" /> Manage Boards in Admin
                        </Link>
                    </div>
                </div>
            </section>

            {/* MOVING CHAINS: BREAKING NEWS & TRENDING INTELLIGENCE (Unfiltered Mode Only) */}
            {!isFiltered && (
                <section className="bg-[#F4FAFE] border-b border-[#E6EEF3] py-8 space-y-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                        
                        {/* CHAIN 1: BREAKING NEWS BULLETINS */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center font-bold">
                                        <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    </div>
                                    <h2 className="text-xl font-bold font-outfit text-[#102A3D]">
                                        Breaking News Bulletins
                                    </h2>
                                </div>
                                <span className="text-xs text-[#718797] font-semibold hidden sm:inline">
                                    Hover cards to smoothly expand and pause scroll
                                </span>
                            </div>

                            <MovingChainRow speedSeconds={280}>
                                {breakingArticles.map((art) => (
                                    <ArticleCard
                                        key={art.id}
                                        id={art.id}
                                        title={art.title}
                                        slug={art.slug}
                                        subtitle={art.subtitle}
                                        category={art.category}
                                        isBreaking={true}
                                        viewCount={art.view_count}
                                        author={art.author ? { name: art.author.name, role: art.author.role_title } : undefined}
                                        readingTimeMinutes={parseInt(art.reading_time) || 5}
                                        variant="compact"
                                    />
                                ))}
                            </MovingChainRow>
                        </div>

                        {/* CHAIN 2: TRENDING BUSINESS INTELLIGENCE */}
                        <div className="space-y-3 pt-4 border-t border-[#E6EEF3]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 flex items-center justify-center font-bold">
                                        <Flame className="w-4 h-4 fill-rose-500 text-rose-500" />
                                    </div>
                                    <h2 className="text-xl font-bold font-outfit text-[#102A3D]">
                                        Trending Business Intelligence
                                    </h2>
                                </div>
                                <span className="text-xs text-[#718797] font-semibold hidden sm:inline">
                                    Ranked by live original feed view counts
                                </span>
                            </div>

                            <MovingChainRow speedSeconds={320}>
                                {trendingArticles.map((art) => (
                                    <ArticleCard
                                        key={art.id}
                                        id={art.id}
                                        title={art.title}
                                        slug={art.slug}
                                        subtitle={art.subtitle}
                                        category={art.category}
                                        isTrending={true}
                                        viewCount={art.view_count}
                                        author={art.author ? { name: art.author.name, role: art.author.role_title } : undefined}
                                        readingTimeMinutes={parseInt(art.reading_time) || 5}
                                        variant="standard"
                                    />
                                ))}
                            </MovingChainRow>
                        </div>

                    </div>
                </section>
            )}

            {/* Main Non-Overlapping BBC News Style Editorial Newspaper Grid Sections */}
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {isFiltered ? (
                        /* Filtered Subcategory Mode: Distinct Non-Repeating Headings per Section */
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-4">
                                <div>
                                    <h2 className="text-2xl font-black font-outfit text-[#102A3D]">
                                        {filters.type ? `${filters.type} Playbooks` : 'Search Results'} ({articles.data.length} Stories)
                                    </h2>
                                    <p className="text-xs text-[#718797] mt-0.5">
                                        Distinct editorial newspaper layout sections with interleaved sponsor spaces
                                    </p>
                                </div>
                                <button 
                                    onClick={() => router.get('/ideas')}
                                    className="text-xs font-bold text-[#287FBA] hover:underline"
                                >
                                    Reset Filters
                                </button>
                            </div>

                            {/* Render subcategory articles using distinct BBC News Grid Sections */}
                            {filteredChunks.map((chunk, idx) => (
                                <React.Fragment key={idx}>
                                    <NewspaperGridSection 
                                        boardName={chunk.boardName}
                                        layoutType={chunk.layoutType}
                                        articles={chunk.articles}
                                    />
                                    <AdSpaceBanner 
                                        adType={chunk.adType}
                                        boardName={chunk.boardName}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    ) : (
                        /* Unfiltered Mode: Static Non-Overlapping Editorial Boards Interleaved with Google Ads & Engage Spaces */
                        <div className="space-y-6">
                            {editorialBoards.map((board, boardIndex) => {
                                const boardArticles = getArticlesForBoard(board.category_filter, boardIndex);
                                return (
                                    <React.Fragment key={board.id}>
                                        {/* Editorial Newspaper Grid Section (BBC News Layouts) */}
                                        <NewspaperGridSection 
                                            boardName={board.name}
                                            layoutType={board.layout_type}
                                            articles={boardArticles}
                                            onViewAll={() => handleTypeFilter(board.category_filter || '')}
                                        />

                                        {/* Interleaved Responsive Google Ads / Engage Space */}
                                        <AdSpaceBanner 
                                            adType={board.ad_type}
                                            adCode={board.ad_code}
                                            boardName={board.name}
                                        />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
