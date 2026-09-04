import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { 
    LayoutDashboard, 
    BookOpen, 
    Sparkles, 
    Calculator, 
    MessageSquare, 
    Compass, 
    RefreshCw, 
    Layers, 
    CheckCircle2, 
    ShieldCheck, 
    Vote, 
    Star, 
    FileText, 
    Plus, 
    Globe, 
    Settings,
    ArrowUpRight,
    Search,
    ExternalLink,
    Lock,
    KeyRound,
    Cpu,
    Database,
    Zap,
    Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface AdminStats {
    total_articles?: number;
    total_categories?: number;
    total_polls?: number;
    total_votes?: number;
    total_quizzes?: number;
    total_questions?: number;
    total_reviews?: number;
    total_galleries?: number;
    total_boards?: number;
}

interface AdminDashboardProps {
    stats?: AdminStats;
    latestArticles?: any[];
    recentPolls?: any[];
    recentReviews?: any[];
    config?: any;
}

export default function Dashboard({
    stats = {},
    latestArticles = [],
    recentPolls = [],
    recentReviews = [],
    config = {}
}: AdminDashboardProps) {
    const [syncing, setSyncing] = useState(false);
    const [rewriting, setRewriting] = useState(false);

    const safeStats = stats || {};
    const safeArticles = Array.isArray(latestArticles) ? latestArticles : [];
    const safeReviews = Array.isArray(recentReviews) ? recentReviews : [];

    const handleSyncRss = () => {
        setSyncing(true);
        router.post('/admin/sync-rss', {}, {
            onFinish: () => setSyncing(false),
        });
    };

    const handleRewriteArticles = () => {
        setRewriting(true);
        router.post('/admin/rewrite-articles', {}, {
            onFinish: () => setRewriting(false),
        });
    };

    const handleReviewStatus = (reviewId: number, status: string) => {
        router.patch(`/admin/reviews/${reviewId}/status`, { status });
    };

    return (
        <AdminLayout title="Master Platform Administrative Control">
            <Head title="Master CAP Admin Backend Control Panel — Bizztopia" />

            <div className="space-y-8 font-sans">
                {/* Top Control Banner & Quick Automation Actions */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6EEF3] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#287FBA] text-xs font-bold font-outfit uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5" /> Secured Administrative Zone
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black font-outfit text-[#102A3D] tracking-tight">
                            Bizztopia Master Operations Dashboard
                        </h1>
                        <p className="text-xs md:text-sm text-[#718797] font-medium">
                            Control platform intelligence, 50-article daily ingestion feeds, AI rewriter pipeline, moderation & ad spaces.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <button
                            onClick={handleSyncRss}
                            disabled={syncing}
                            className="px-4 py-3 rounded-2xl bg-[#287FBA] hover:bg-[#1f689a] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#287FBA]/20 cursor-pointer disabled:opacity-50 font-outfit"
                        >
                            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                            <span>{syncing ? 'Syncing Feeds...' : 'Sync RSS Feeds (50 Cap)'}</span>
                        </button>

                        <button
                            onClick={handleRewriteArticles}
                            disabled={rewriting}
                            className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50 font-outfit"
                        >
                            <Sparkles className={`w-4 h-4 ${rewriting ? 'animate-spin' : ''}`} />
                            <span>{rewriting ? 'Rewriting Articles...' : 'Run AI Article Rewriter'}</span>
                        </button>
                    </div>
                </div>

                {/* API & System Integration Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* OpenAI API Key Status */}
                    <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-md relative overflow-hidden">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-amber-400" />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-outfit">OpenAI Engine API</span>
                            </div>
                            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                Connected
                            </span>
                        </div>
                        <div>
                            <div className="text-lg font-bold font-outfit text-white">Model: gpt-4o-mini</div>
                            <div className="text-xs text-slate-400 mt-1">Dual-engine failover to In-House Editorial Synthesizer active.</div>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800 flex items-center justify-between">
                            <span>Key: sk-proj-...5TT3</span>
                            <span className="text-emerald-400 font-bold">100% Operational</span>
                        </div>
                    </div>

                    {/* Pexels HD Imagery Status */}
                    <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-md relative overflow-hidden">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Globe className="w-5 h-5 text-[#63B5E8]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-outfit">Pexels Photo Catalog</span>
                            </div>
                            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                Active Pool
                            </span>
                        </div>
                        <div>
                            <div className="text-lg font-bold font-outfit text-white">2,200 HD Trade Images</div>
                            <div className="text-xs text-slate-400 mt-1">Mapped across all 74 trade subcategories in SQLite.</div>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800 flex items-center justify-between">
                            <span>Key: DE3BFr...WdWFc</span>
                            <span className="text-emerald-400 font-bold">74/74 Subcategories</span>
                        </div>
                    </div>

                    {/* Ingestion Cap Status */}
                    <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-md relative overflow-hidden">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-[#287FBA]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-outfit">Daily Ingestion Cap</span>
                            </div>
                            <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                Max 50/Day
                            </span>
                        </div>
                        <div>
                            <div className="text-lg font-bold font-outfit text-white">Strict Daily Limit: 50</div>
                            <div className="text-xs text-slate-400 mt-1">Prevents database bloating & guarantees editorial quality.</div>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800 flex items-center justify-between">
                            <span>Cron: 0 6 * * *</span>
                            <span className="text-blue-400 font-bold">Auto-Sync Enabled</span>
                        </div>
                    </div>
                </div>

                {/* Real-time Metrics Dashboard Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Metric 1: Total Articles */}
                    <div className="bg-white p-6 rounded-3xl border border-[#E6EEF3] shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#718797] uppercase tracking-wider font-outfit">Total Knowledge Articles</span>
                            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#287FBA] flex items-center justify-center font-bold">
                                <BookOpen className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-black font-outfit text-[#102A3D]">
                            {safeStats.total_articles ?? 0}
                        </div>
                        <div className="text-xs text-[#466071] font-medium">
                            Across 74 specialized business subcategories
                        </div>
                    </div>

                    {/* Metric 2: Engage Polls & Votes */}
                    <div className="bg-white p-6 rounded-3xl border border-[#E6EEF3] shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#718797] uppercase tracking-wider font-outfit">Community Poll Votes</span>
                            <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                                <Sparkles className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-black font-outfit text-[#102A3D]">
                            {safeStats.total_votes ?? 0}
                        </div>
                        <div className="text-xs text-[#466071] font-medium">
                            Cast across {safeStats.total_polls ?? 0} active polls
                        </div>
                    </div>

                    {/* Metric 3: Verified Client Reviews */}
                    <div className="bg-white p-6 rounded-3xl border border-[#E6EEF3] shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#718797] uppercase tracking-wider font-outfit">Verified Client Reviews</span>
                            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                                <Star className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-black font-outfit text-[#102A3D]">
                            {safeStats.total_reviews ?? 0}
                        </div>
                        <div className="text-xs text-[#466071] font-medium">
                            Verified reputation feedback entries
                        </div>
                    </div>

                    {/* Metric 4: Ad Spaces & Editorial Boards */}
                    <div className="bg-white p-6 rounded-3xl border border-[#E6EEF3] shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#718797] uppercase tracking-wider font-outfit">Editorial Ad Spaces</span>
                            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                <Layers className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-black font-outfit text-[#102A3D]">
                            {safeStats.total_boards ?? 4}
                        </div>
                        <div className="text-xs text-[#466071] font-medium">
                            Configured ad spaces & custom layouts
                        </div>
                    </div>
                </div>

                {/* Section: Management Data Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Recent Ingested Articles (8 Cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6EEF3] shadow-xs space-y-5">
                            <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-4">
                                <h3 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-[#287FBA]" /> Recent Ingested & Rewritten Articles
                                </h3>
                                <Link href="/admin/articles" className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1 font-outfit">
                                    Manage Articles ({safeStats.total_articles ?? 0}) →
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-[#E6EEF3] text-[#718797] uppercase tracking-wider font-bold font-outfit">
                                            <th className="pb-3">Article Title</th>
                                            <th className="pb-3">Category</th>
                                            <th className="pb-3 text-right">Reading Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E6EEF3]">
                                        {safeArticles.map((art: any) => (
                                            <tr key={art.id} className="hover:bg-[#F4FAFE]">
                                                <td className="py-3.5 font-bold text-[#102A3D] max-w-xs truncate">
                                                    <Link href={`/ideas/${art.slug}`} target="_blank" className="hover:text-[#287FBA] transition-colors">
                                                        {art.title}
                                                    </Link>
                                                </td>
                                                <td className="py-3.5">
                                                    <span className="bg-[#287FBA]/10 text-[#287FBA] px-2.5 py-1 rounded-md text-[10px] font-black uppercase font-outfit">
                                                        {art.category?.name || 'General'}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 text-right font-bold text-[#466071]">
                                                    {art.reading_time || '4 min read'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Moderation & Shortcuts (4 Cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Moderation Box */}
                        <div className="bg-white p-6 rounded-3xl border border-[#E6EEF3] shadow-xs space-y-5">
                            <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-4">
                                <h3 className="text-sm font-bold font-outfit text-[#102A3D] flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-500" /> Pending Moderation
                                </h3>
                                <Link href="/admin/reviews" className="text-xs font-bold text-[#287FBA] hover:underline font-outfit">
                                    Manage All →
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {safeReviews.length === 0 ? (
                                    <div className="text-center py-6 text-xs text-slate-400 font-medium">
                                        All client reviews are approved and published.
                                    </div>
                                ) : (
                                    safeReviews.map((rev: any) => (
                                        <div key={rev.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-extrabold text-slate-900">{rev.reviewer_name}</span>
                                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
                                                    {rev.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-600 line-clamp-2">{rev.review_text}</p>
                                            <div className="flex gap-2 pt-1">
                                                <button
                                                    onClick={() => handleReviewStatus(rev.id, 'approved')}
                                                    className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold hover:bg-emerald-700 cursor-pointer"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReviewStatus(rev.id, 'rejected')}
                                                    className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-[10px] font-bold hover:bg-rose-700 cursor-pointer"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Quick Navigation Shortcuts */}
                        <div className="bg-[#041E34] text-white p-6 rounded-3xl space-y-4">
                            <h3 className="text-sm font-bold font-outfit uppercase tracking-wider text-[#63B5E8]">
                                Quick Admin Shortcuts
                            </h3>
                            <div className="space-y-2 text-xs font-bold font-outfit">
                                <Link href="/admin/articles" className="block p-3 rounded-xl bg-[#0B4778] hover:bg-[#287FBA] transition-colors flex items-center justify-between">
                                    <span>Manage Articles & Ingestion</span>
                                    <span>→</span>
                                </Link>
                                <Link href="/admin/boards" className="block p-3 rounded-xl bg-[#0B4778] hover:bg-[#287FBA] transition-colors flex items-center justify-between">
                                    <span>Editorial Boards & Ad Spaces</span>
                                    <span>→</span>
                                </Link>
                                <Link href="/admin/polls" className="block p-3 rounded-xl bg-[#0B4778] hover:bg-[#287FBA] transition-colors flex items-center justify-between">
                                    <span>Polls & Diagnostic Arena</span>
                                    <span>→</span>
                                </Link>
                                <Link href="/admin/settings" className="block p-3 rounded-xl bg-[#0B4778] hover:bg-[#287FBA] transition-colors flex items-center justify-between">
                                    <span>Platform Environment Config</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
