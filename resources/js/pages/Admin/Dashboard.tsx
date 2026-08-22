import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
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
    ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface AdminStats {
    total_articles: number;
    total_categories: number;
    total_polls: number;
    total_votes: number;
    total_quizzes: number;
    total_questions: number;
    total_reviews: number;
    total_galleries: number;
}

interface AdminDashboardProps {
    stats: AdminStats;
    latestArticles: any[];
    recentPolls: any[];
    recentReviews: any[];
    config: any;
}

export default function Dashboard({
    stats,
    latestArticles,
    recentPolls,
    recentReviews,
    config
}: AdminDashboardProps) {
    const [syncing, setSyncing] = useState(false);
    const [selectedVertical, setSelectedVertical] = useState('Bizztopia');
    const [replicating, setReplicating] = useState(false);
    const [replicatedSuccess, setReplicatedSuccess] = useState<string | null>(null);

    const handleSyncRss = () => {
        setSyncing(true);
        router.post('/ideas/sync-rss', {}, {
            onFinish: () => setSyncing(false),
        });
    };

    const handleReplicate = (verticalName: string) => {
        setSelectedVertical(verticalName);
        setReplicating(true);
        setTimeout(() => {
            setReplicating(false);
            setReplicatedSuccess(verticalName);
            setTimeout(() => setReplicatedSuccess(null), 4000);
        }, 1200);
    };

    const handleReviewStatus = (reviewId: number, status: string) => {
        router.patch(`/admin/reviews/${reviewId}/status`, { status });
    };

    return (
        <div className="min-h-screen bg-[#F4FAFE] text-[#102A3D] flex flex-col font-sans">
            <Head title="Master CAP Admin Backend Control Panel — Techception" />

            {/* Top Admin Header Bar */}
            <header className="bg-[#041E34] border-b border-[#0B4778] text-white px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <img src="/images/logo.png" alt="Bizztopia Admin" className="h-9 w-auto" />
                            <div className="border-l border-[#0B4778] pl-3">
                                <span className="text-[10px] font-bold tracking-widest text-[#63B5E8] uppercase block">
                                    Admin Control Panel
                                </span>
                                <span className="text-sm font-extrabold text-white">
                                    {config?.name || 'Bizztopia'} Master CAP Engine
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-[#8FC7E8] flex items-center gap-1.5 bg-[#0B4778]/50 px-3 py-1.5 rounded-lg border border-[#0B4778]">
                            <ShieldCheck className="w-4 h-4 text-[#249A68]" /> DDD Modular Backend Active
                        </span>
                        <Link href="/" target="_blank" className="text-xs font-bold text-white hover:text-[#63B5E8] flex items-center gap-1 bg-[#287FBA] px-3.5 py-1.5 rounded-lg transition-colors">
                            View Live Site <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Admin Body Grid */}
            <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-grow space-y-8">
                {/* Notification Banner */}
                {replicatedSuccess && (
                    <div className="p-4 rounded-xl bg-[#249A68] text-white font-bold text-sm flex items-center justify-between animate-in fade-in">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            Successfully replicated Master CAP architecture to target vertical: {replicatedSuccess}!
                        </span>
                        <span className="text-xs font-normal opacity-90">Config profile created cleanly</span>
                    </div>
                )}

                {/* Top Control Bar & Quick Actions */}
                <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold font-outfit text-[#102A3D]">
                            Master Platform Administrative Control
                        </h1>
                        <p className="text-xs text-[#718797]">
                            Manage content, RSS feeds, live polls, reviews moderation, and vertical replication settings.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleSyncRss} 
                            isLoading={syncing}
                            className="border-[#287FBA] text-[#0B4778] hover:bg-[#EAF5FC]"
                        >
                            <RefreshCw className="w-4 h-4 mr-1.5" /> Sync RSS Feeds (200)
                        </Button>
                        <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={() => handleReplicate('Regentology')}
                            isLoading={replicating}
                        >
                            <Layers className="w-4 h-4 mr-1.5" /> Replicate Vertical
                        </Button>
                    </div>
                </div>

                {/* Real-time Metrics Dashboard Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Metric 1: Total Articles */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#718797] uppercase tracking-wider">Ideas Knowledge Engine</span>
                            <div className="w-8 h-8 rounded-lg bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                                <BookOpen className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-extrabold font-outfit text-[#102A3D]">
                            {stats.total_articles}
                        </div>
                        <div className="text-xs text-[#466071]">
                            Equally distributed across 6 subcategories
                        </div>
                    </div>

                    {/* Metric 2: Engage Polls & Votes */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#718797] uppercase tracking-wider">Engage Arena</span>
                            <div className="w-8 h-8 rounded-lg bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                                <Sparkles className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-extrabold font-outfit text-[#102A3D]">
                            {stats.total_votes}
                        </div>
                        <div className="text-xs text-[#466071]">
                            Votes cast across {stats.total_polls} active polls
                        </div>
                    </div>

                    {/* Metric 3: Verified Client Reviews */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#718797] uppercase tracking-wider">Social Trust Engine</span>
                            <div className="w-8 h-8 rounded-lg bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                                <Star className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-extrabold font-outfit text-[#102A3D]">
                            {stats.total_reviews}
                        </div>
                        <div className="text-xs text-[#466071]">
                            Verified client reviews & trust feedback
                        </div>
                    </div>

                    {/* Metric 4: Visual Showrooms */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#718797] uppercase tracking-wider">Inspire Showrooms</span>
                            <div className="w-8 h-8 rounded-lg bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                                <Compass className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-extrabold font-outfit text-[#102A3D]">
                            {stats.total_galleries}
                        </div>
                        <div className="text-xs text-[#466071]">
                            Architectural & workspace design galleries
                        </div>
                    </div>
                </div>

                {/* Section 2: Management Data Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Recent Articles & RSS Sources (8 Cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-4">
                            <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-4">
                                <h3 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-[#4A9AD4]" /> Recent Ingested Articles & Feeds
                                </h3>
                                <Link href="/ideas" className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1">
                                    Manage All 200 Feeds <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-[#E6EEF3] text-[#718797] uppercase tracking-wider font-bold">
                                            <th className="pb-3">Article Title</th>
                                            <th className="pb-3">Subcategory</th>
                                            <th className="pb-3">Source Feed</th>
                                            <th className="pb-3 text-right">Reading Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E6EEF3]">
                                        {latestArticles.map((art) => (
                                            <tr key={art.id} className="hover:bg-[#F4FAFE]">
                                                <td className="py-3 font-bold text-[#102A3D] max-w-xs truncate">
                                                    <Link href={`/ideas/${art.slug}`} className="hover:text-[#287FBA]">
                                                        {art.title}
                                                    </Link>
                                                </td>
                                                <td className="py-3">
                                                    <Badge variant="brand" size="sm">{art.content_type}</Badge>
                                                </td>
                                                <td className="py-3 text-[#466071] font-medium">{art.source_rss_name || 'RSS Feed'}</td>
                                                <td className="py-3 text-right font-semibold text-[#718797]">{art.reading_time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Replication Target Matrix */}
                        <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-4">
                            <h3 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2 border-b border-[#E6EEF3] pb-4">
                                <Layers className="w-5 h-5 text-[#4A9AD4]" /> Multi-Vertical CAP Replication Targets
                            </h3>
                            <p className="text-xs text-[#466071] leading-relaxed">
                                Click any vertical below to trigger instant architecture replication, Tailwind design token initialization, and database schema deployment.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                {[
                                    { name: 'Regentology', domain: 'regentology.com', tag: 'Real Estate' },
                                    { name: 'Rate My Doc', domain: 'ratemydoc.com', tag: 'Medical' },
                                    { name: 'HouzzWise', domain: 'houzzwise.com', tag: 'Remodeling' },
                                    { name: 'TruSecur', domain: 'trusecur.com', tag: 'Solar Energy' },
                                ].map((vert) => (
                                    <button
                                        key={vert.name}
                                        onClick={() => handleReplicate(vert.name)}
                                        className="p-3 rounded-xl border border-[#E6EEF3] bg-[#F7FAFC] hover:bg-[#EAF5FC] hover:border-[#4A9AD4] text-left transition-all group"
                                    >
                                        <div className="text-xs font-bold text-[#102A3D] group-hover:text-[#0B4778]">{vert.name}</div>
                                        <div className="text-[10px] text-[#718797]">{vert.domain}</div>
                                        <Badge variant="secondary" size="sm" className="mt-2 text-[9px] px-1.5 py-0">
                                            {vert.tag}
                                        </Badge>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Moderation & Live Polls (4 Cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Live Industry Polls Summary */}
                        <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-4">
                            <h3 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2 border-b border-[#E6EEF3] pb-4">
                                <Vote className="w-5 h-5 text-[#4A9AD4]" /> Active Industry Polls
                            </h3>
                            <div className="space-y-4">
                                {recentPolls.map((poll) => (
                                    <div key={poll.id} className="p-3.5 rounded-xl bg-[#F7FAFC] border border-[#E6EEF3] space-y-2">
                                        <div className="text-xs font-bold text-[#102A3D] line-clamp-2">{poll.title}</div>
                                        <div className="flex items-center justify-between text-[11px] text-[#718797]">
                                            <span>{poll.total_votes} Total Votes</span>
                                            <Badge variant="success" size="sm">Active</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Moderate Client Reviews */}
                        <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-4">
                            <h3 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2 border-b border-[#E6EEF3] pb-4">
                                <Star className="w-5 h-5 text-[#4A9AD4]" /> Client Reviews Moderation
                            </h3>
                            <div className="space-y-4">
                                {recentReviews.map((rev) => (
                                    <div key={rev.id} className="p-3.5 rounded-xl bg-[#F7FAFC] border border-[#E6EEF3] space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs font-bold text-[#102A3D]">{rev.client_name}</div>
                                            <Badge variant={rev.status === 'approved' ? 'success' : 'secondary'} size="sm">
                                                {rev.status}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-[#466071] line-clamp-2 italic">"{rev.comment}"</p>
                                        <div className="flex items-center gap-2 pt-1">
                                            {rev.status !== 'approved' && (
                                                <button
                                                    onClick={() => handleReviewStatus(rev.id, 'approved')}
                                                    className="text-[10px] font-bold text-[#249A68] hover:underline"
                                                >
                                                    Approve Review
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
