import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { 
    BookOpen, 
    Sparkles, 
    Star, 
    Compass, 
    RefreshCw, 
    Layers, 
    FileText, 
    TrendingUp, 
    Vote, 
    ExternalLink, 
    CheckCircle2,
    ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Dashboard({
    stats,
    latestArticles,
    recentPolls,
    recentReviews,
    config
}) {
    const [syncing, setSyncing] = useState(false);
    const [replicating, setReplicating] = useState(false);

    const handleSyncRss = () => {
        setSyncing(true);
        router.post('/ideas/sync-rss', {}, {
            onFinish: () => setSyncing(false),
        });
    };

    return (
        <AdminLayout title="Filament Admin Dashboard">
            <Head title="Filament Admin — Bizztopia Backend" />

            {/* Filament Header Welcome & Controls */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold font-outfit text-white">
                        Welcome to Bizztopia Filament Admin
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Filament v3 Resource Management System • Master CAP Architecture
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleSyncRss} 
                        isLoading={syncing}
                        className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                    >
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Sync RSS (200)
                    </Button>
                </div>
            </div>

            {/* Filament Metric Widgets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Widget 1: Articles */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Articles</span>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/20">
                            <TrendingUp className="w-3 h-3" /> +100%
                        </span>
                    </div>
                    <div className="text-3xl font-extrabold font-outfit text-white">
                        {stats.total_articles}
                    </div>
                    <div className="text-xs text-slate-400">
                        Equally distributed across subcategories
                    </div>
                </div>

                {/* Widget 2: Engage Votes */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Engage Votes</span>
                        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-500/20">
                            <TrendingUp className="w-3 h-3" /> +24%
                        </span>
                    </div>
                    <div className="text-3xl font-extrabold font-outfit text-white">
                        {stats.total_votes}
                    </div>
                    <div className="text-xs text-slate-400">
                        Votes cast across {stats.total_polls} active polls
                    </div>
                </div>

                {/* Widget 3: Client Reviews */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Reviews</span>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" /> 5.0 Rating
                        </span>
                    </div>
                    <div className="text-3xl font-extrabold font-outfit text-white">
                        {stats.total_reviews}
                    </div>
                    <div className="text-xs text-slate-400">
                        Moderated client reviews
                    </div>
                </div>

                {/* Widget 4: Showroom Galleries */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visual Galleries</span>
                        <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-indigo-500/20">
                            Live
                        </span>
                    </div>
                    <div className="text-3xl font-extrabold font-outfit text-white">
                        {stats.total_galleries}
                    </div>
                    <div className="text-xs text-slate-400">
                        Inspire showroom collections
                    </div>
                </div>
            </div>

            {/* Filament Resources Table Section */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden space-y-4 p-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-base font-bold font-outfit text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400" /> Articles Resource Table
                    </h3>
                    <Link href="/admin/articles" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1">
                        View All Resources <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Subcategory</th>
                                <th className="p-3">Feed Source</th>
                                <th className="p-3 text-right">Read Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-300">
                            {latestArticles.map((art) => (
                                <tr key={art.id} className="hover:bg-slate-800/50">
                                    <td className="p-3 font-bold text-white max-w-sm truncate">
                                        <Link href={`/ideas/${art.slug}`} target="_blank" className="hover:text-amber-400">
                                            {art.title}
                                        </Link>
                                    </td>
                                    <td className="p-3">
                                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                                            {art.content_type}
                                        </span>
                                    </td>
                                    <td className="p-3 text-slate-400">{art.source_rss_name || 'RSS Feed'}</td>
                                    <td className="p-3 text-right font-semibold text-slate-400">{art.reading_time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
