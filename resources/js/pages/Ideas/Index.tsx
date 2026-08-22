import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { EngagePromoUnit } from '@/components/ui/EngagePromoUnit';
import { MovingChainRow } from '@/components/ui/MovingChainRow';
import { 
    BookOpen, 
    Search, 
    RefreshCw, 
    Globe, 
    Rss,
    FileText,
    CheckSquare,
    HelpCircle,
    Lightbulb,
    Sparkles,
    ArrowRight,
    Compass,
    CheckCircle2
} from 'lucide-react';

interface ArticleItem {
    id: number;
    title: string;
    slug: string;
    subtitle: string;
    content_type: string;
    reading_time: string;
    region: string;
    source_rss_name: string;
    published_at: string;
    category?: {
        name: string;
        slug: string;
        color: string;
    };
    author?: {
        name: string;
        role_title: string;
        avatarUrl?: string;
    };
}

interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    description?: string;
    articles_count: number;
}

interface IdeasIndexProps {
    articles: {
        data: ArticleItem[];
        links: any[];
    };
    categories: CategoryItem[];
    filters: {
        category?: string;
        type?: string;
        search?: string;
    };
    region: string;
}

export default function Index({ articles, categories, filters, region }: IdeasIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [syncing, setSyncing] = useState(false);

    const subTabs = [
        { label: 'All Ideas Sections', value: '' },
        { label: 'Blogs', value: 'Blog' },
        { label: 'Industry Guides', value: 'Industry Guide' },
        { label: 'Tips & Tricks', value: 'Tips & Tricks' },
        { label: 'How-To Articles', value: 'How-To' },
        { label: 'Checklists', value: 'Checklist' },
        { label: 'Guides', value: 'Guide' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/ideas', { ...filters, search }, { preserveState: true });
    };

    const handleTypeFilter = (type?: string) => {
        router.get('/ideas', { ...filters, type: type || '' }, { preserveState: true });
    };

    const handleSyncRss = () => {
        setSyncing(true);
        router.post('/ideas/sync-rss', {}, {
            onFinish: () => setSyncing(false),
        });
    };

    // Group articles by content type for row-form sections
    const getArticlesByType = (type: string) => {
        return articles.data.filter(a => a.content_type === type);
    };

    const blogs = getArticlesByType('Blog');
    const industryGuides = getArticlesByType('Industry Guide');
    const tipsAndTricks = getArticlesByType('Tips & Tricks');
    const howTos = getArticlesByType('How-To');
    const checklists = getArticlesByType('Checklist');
    const guides = getArticlesByType('Guide');

    // Filtered mode check
    const isFiltered = Boolean(filters.type || filters.search || filters.category);

    return (
        <AppLayout>
            <Head title="Ideas — North American RSS Business Knowledge Network" />

            {/* Ideas Portal Hero Header */}
            <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-hero text-white border-b border-[#0B4778]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="max-w-2xl space-y-4">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A9AD4]/20 border border-[#8FC7E8]/40 text-[#63B5E8] text-xs font-semibold uppercase tracking-wider">
                                <Globe className="w-3.5 h-3.5 text-[#63B5E8]" />
                                <span>Ideas Website • {region} RSS Intelligence</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit text-white tracking-tight">
                                Business Ideas, Guides & RSS Playbooks<span className="text-[#4A9AD4]">.</span>
                            </h1>
                            <p className="text-[#D5EBF8] text-base leading-relaxed">
                                Continuous RSS ingestion from verified US & Canadian business feeds: Entrepreneur, SBA, and SmallBizTrends.
                            </p>

                            {/* Search Form */}
                            <form onSubmit={handleSearch} className="flex items-center gap-2 pt-2">
                                <div className="flex-1 max-w-lg">
                                    <Input
                                        placeholder="Search RSS blogs, guides, checklists, how-to..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        icon={<Search className="w-4 h-4 text-[#718797]" />}
                                    />
                                </div>
                                <Button type="submit" variant="primary">
                                    Search Ideas
                                </Button>
                            </form>
                        </div>

                        {/* Verified RSS Sync Card */}
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 max-w-md w-full space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#63B5E8] uppercase tracking-wider flex items-center gap-1.5">
                                    <Rss className="w-4 h-4 text-[#63B5E8]" /> Verified RSS Feed Ingestion
                                </span>
                                <Badge variant="success" size="sm">Live Feeds</Badge>
                            </div>
                            <p className="text-xs text-[#D5EBF8]">
                                Categorized into row sections: Blogs, Industry Guides, Tips & Tricks, How-To Articles, Checklists, and Guides.
                            </p>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                fullWidth 
                                onClick={handleSyncRss}
                                isLoading={syncing}
                                className="bg-white/5 border-white/30 text-white hover:bg-white/20 hover:text-white"
                            >
                                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                                Ingest Latest RSS Feeds
                            </Button>
                        </div>
                    </div>

                    {/* Sub-Tab Navigation Bar */}
                    <div className="flex items-center gap-2 pt-8 overflow-x-auto">
                        <span className="text-xs text-[#8FC7E8] font-bold uppercase tracking-wider mr-2 shrink-0">Subcategory Rows:</span>
                        {subTabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => handleTypeFilter(tab.value)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                                    (filters.type === tab.value || (!filters.type && !tab.value))
                                        ? 'bg-white text-[#0B4778] border-white shadow-md' 
                                        : 'bg-[#0B4778]/70 text-[#8FC7E8] border-[#287FBA]/30 hover:bg-[#0B4778] hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subcategories Displayed in Stacked Ultra-Slow Moving Chain Rows */}
            <section className="py-12 bg-[#F7FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    
                    {/* IF FILTERED MODE: Show Filtered Grid Results */}
                    {isFiltered ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold font-outfit text-[#102A3D]">
                                    {filters.type ? `${filters.type} Section` : 'Filtered Search Results'}
                                </h2>
                                <button 
                                    onClick={() => router.get('/ideas')}
                                    className="text-xs font-bold text-[#287FBA] hover:underline"
                                >
                                    Show All Subcategory Moving Rows →
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {articles.data.map((art) => (
                                    <ArticleCard
                                        key={art.id}
                                        id={art.id}
                                        title={art.title}
                                        slug={art.slug}
                                        subtitle={art.subtitle}
                                        category={art.category}
                                        author={art.author ? { name: art.author.name, role: art.author.role_title, avatarUrl: art.author.avatarUrl } : undefined}
                                        readingTimeMinutes={parseInt(art.reading_time) || 5}
                                        publishedAt={art.published_at ? new Date(art.published_at).toLocaleDateString() : undefined}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* UNFILTERED IDEAS HOMEPAGE: ULTRA-SLOW COMFORTABLE READING SPEED (300s-340s) */
                        <>
                            {/* ROW 1: BLOGS MOVING CHAIN (Comfortable Reading Speed: 320s) */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                                            <FileText className="w-4 h-4 text-[#4A9AD4]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Blogs & Editorial Insights</h2>
                                            <p className="text-[11px] text-[#718797]">RSS blogs and market opinion pieces • Ultra-slow comfortable glide</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleTypeFilter('Blog')} className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1">
                                        View All Blogs <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {blogs.length > 0 ? (
                                    <MovingChainRow speedSeconds={320}>
                                        {blogs.map((art) => (
                                            <ArticleCard
                                                key={art.id}
                                                id={art.id}
                                                title={art.title}
                                                slug={art.slug}
                                                subtitle={art.subtitle}
                                                category={art.category}
                                                author={art.author ? { name: art.author.name, role: art.author.role_title } : undefined}
                                                readingTimeMinutes={parseInt(art.reading_time) || 5}
                                            />
                                        ))}
                                    </MovingChainRow>
                                ) : (
                                    <div className="text-xs text-[#718797] italic p-4 bg-white rounded-xl border border-[#E6EEF3]">No blog entries ingested yet.</div>
                                )}
                            </div>

                            {/* ROW 2: INDUSTRY GUIDES MOVING CHAIN */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                                            <BookOpen className="w-4 h-4 text-[#4A9AD4]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Industry Guides & Reports</h2>
                                            <p className="text-[11px] text-[#718797]">Comprehensive industry benchmarks and reports • Ultra-slow comfortable glide</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleTypeFilter('Industry Guide')} className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1">
                                        View All Industry Guides <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {industryGuides.length > 0 ? (
                                    <MovingChainRow speedSeconds={310}>
                                        {industryGuides.map((art) => (
                                            <ArticleCard
                                                key={art.id}
                                                id={art.id}
                                                title={art.title}
                                                slug={art.slug}
                                                subtitle={art.subtitle}
                                                category={art.category}
                                                author={art.author ? { name: art.author.name, role: art.author.role_title } : undefined}
                                                readingTimeMinutes={parseInt(art.reading_time) || 5}
                                            />
                                        ))}
                                    </MovingChainRow>
                                ) : (
                                    <div className="text-xs text-[#718797] italic p-4 bg-white rounded-xl border border-[#E6EEF3]">No industry guides ingested yet.</div>
                                )}
                            </div>

                            {/* Embedded Engage Unit */}
                            <EngagePromoUnit variant="banner" />

                            {/* ROW 3: TIPS & TRICKS MOVING CHAIN */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                                            <Sparkles className="w-4 h-4 text-[#4A9AD4]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Tips & Tricks</h2>
                                            <p className="text-[11px] text-[#718797]">Actionable tactics for customer acquisition & ROI • Ultra-slow comfortable glide</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleTypeFilter('Tips & Tricks')} className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1">
                                        View All Tips <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {tipsAndTricks.length > 0 ? (
                                    <MovingChainRow speedSeconds={300}>
                                        {tipsAndTricks.map((art) => (
                                            <ArticleCard
                                                key={art.id}
                                                id={art.id}
                                                title={art.title}
                                                slug={art.slug}
                                                subtitle={art.subtitle}
                                                category={art.category}
                                                author={art.author ? { name: art.author.name, role: art.author.role_title } : undefined}
                                                readingTimeMinutes={parseInt(art.reading_time) || 5}
                                            />
                                        ))}
                                    </MovingChainRow>
                                ) : (
                                    <div className="text-xs text-[#718797] italic p-4 bg-white rounded-xl border border-[#E6EEF3]">No tips entries ingested yet.</div>
                                )}
                            </div>

                            {/* ROW 4: HOW-TO ARTICLES MOVING CHAIN */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                                            <HelpCircle className="w-4 h-4 text-[#4A9AD4]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold font-outfit text-[#102A3D]">How-To Articles</h2>
                                            <p className="text-[11px] text-[#718797]">Step-by-step technical tutorials and walkthroughs • Ultra-slow comfortable glide</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleTypeFilter('How-To')} className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1">
                                        View All How-To Articles <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {howTos.length > 0 ? (
                                    <MovingChainRow speedSeconds={330}>
                                        {howTos.map((art) => (
                                            <ArticleCard
                                                key={art.id}
                                                id={art.id}
                                                title={art.title}
                                                slug={art.slug}
                                                subtitle={art.subtitle}
                                                category={art.category}
                                                author={art.author ? { name: art.author.name, role: art.author.role_title } : undefined}
                                                readingTimeMinutes={parseInt(art.reading_time) || 5}
                                            />
                                        ))}
                                    </MovingChainRow>
                                ) : (
                                    <div className="text-xs text-[#718797] italic p-4 bg-white rounded-xl border border-[#E6EEF3]">No how-to articles ingested yet.</div>
                                )}
                            </div>

                            {/* ROW 5: CHECKLISTS MOVING CHAIN */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                                            <CheckSquare className="w-4 h-4 text-[#4A9AD4]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Checklists & Frameworks</h2>
                                            <p className="text-[11px] text-[#718797]">Legal formation, state compliance & infrastructure checklists • Ultra-slow comfortable glide</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleTypeFilter('Checklist')} className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1">
                                        View All Checklists <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {checklists.length > 0 ? (
                                    <MovingChainRow speedSeconds={340}>
                                        {checklists.map((art) => (
                                            <ArticleCard
                                                key={art.id}
                                                id={art.id}
                                                title={art.title}
                                                slug={art.slug}
                                                subtitle={art.subtitle}
                                                category={art.category}
                                                author={art.author ? { name: art.author.name, role: art.author.role_title } : undefined}
                                                readingTimeMinutes={parseInt(art.reading_time) || 5}
                                            />
                                        ))}
                                    </MovingChainRow>
                                ) : (
                                    <div className="text-xs text-[#718797] italic p-4 bg-white rounded-xl border border-[#E6EEF3]">No checklists ingested yet.</div>
                                )}
                            </div>

                            {/* ROW 6: GUIDES MOVING CHAIN */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                                            <Compass className="w-4 h-4 text-[#4A9AD4]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Strategic Playbook Guides</h2>
                                            <p className="text-[11px] text-[#718797]">In-depth strategic playbooks and frameworks • Ultra-slow comfortable glide</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleTypeFilter('Guide')} className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1">
                                        View All Guides <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {guides.length > 0 ? (
                                    <MovingChainRow speedSeconds={315}>
                                        {guides.map((art) => (
                                            <ArticleCard
                                                key={art.id}
                                                id={art.id}
                                                title={art.title}
                                                slug={art.slug}
                                                subtitle={art.subtitle}
                                                category={art.category}
                                                author={art.author ? { name: art.author.name, role: art.author.role_title } : undefined}
                                                readingTimeMinutes={parseInt(art.reading_time) || 5}
                                            />
                                        ))}
                                    </MovingChainRow>
                                ) : (
                                    <div className="text-xs text-[#718797] italic p-4 bg-white rounded-xl border border-[#E6EEF3]">No guides ingested yet.</div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
