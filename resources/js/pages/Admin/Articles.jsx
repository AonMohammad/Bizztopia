import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
    BookOpen, 
    Plus, 
    Search, 
    Trash2, 
    ExternalLink, 
    RefreshCw, 
    CheckCircle2, 
    FileText,
    X,
    Edit3,
    ToggleLeft,
    ToggleRight,
    Flame,
    Zap
} from 'lucide-react';

export default function Articles({ articles, categories, authors, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [syncing, setSyncing] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content_type: 'News',
        category_id: categories[0]?.id || 1,
        author_id: authors[0]?.id || 1,
        reading_time: '5 min read',
        source_rss_name: 'Custom Admin Feed',
        content: '<h2>1. Executive Summary</h2><p>Custom administrative playbook content generated from the Master CAP backend.</p>',
    });

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/admin/articles', { ...filters, search }, { preserveState: true });
    };

    const handleFilterType = (type) => {
        router.get('/admin/articles', { ...filters, type }, { preserveState: true });
    };

    const handleSyncRss = () => {
        setSyncing(true);
        router.post('/ideas/sync-rss', {}, {
            onFinish: () => setSyncing(false),
        });
    };

    const handleToggleStatus = (id) => {
        router.patch(`/admin/articles/${id}/toggle-status`, {}, { preserveScroll: true });
    };

    const handleToggleTrending = (id) => {
        router.patch(`/admin/articles/${id}/toggle-trending`, {}, { preserveScroll: true });
    };

    const handleToggleBreaking = (id) => {
        router.patch(`/admin/articles/${id}/toggle-breaking`, {}, { preserveScroll: true });
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        router.post('/admin/articles', formData, {
            onSuccess: () => {
                setShowCreateModal(false);
                setFormData({
                    title: '',
                    subtitle: '',
                    content_type: 'News',
                    category_id: categories[0]?.id || 1,
                    author_id: authors[0]?.id || 1,
                    reading_time: '5 min read',
                    source_rss_name: 'Custom Admin Feed',
                    content: '<h2>1. Executive Summary</h2><p>Custom administrative playbook content generated from the Master CAP backend.</p>',
                });
            },
        });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!editingArticle) return;
        router.put(`/admin/articles/${editingArticle.id}`, editingArticle, {
            onSuccess: () => setEditingArticle(null),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this article?')) {
            router.delete(`/admin/articles/${id}`);
        }
    };

    return (
        <AdminLayout title="Articles Resource Management">
            <Head title="Articles Management — Filament Admin" />

            {/* Filament Action Bar */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold font-outfit text-white">
                        Articles & Feeds ({articles.data.length})
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Toggle Status, Trending 🔥, Breaking News ⚡ badges, or sync RSS feeds.
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
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Sync RSS
                    </Button>
                    <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => setShowCreateModal(true)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                    >
                        <Plus className="w-4 h-4 mr-1.5" /> New Article
                    </Button>
                </div>
            </div>

            {/* Filament Table Filter & Search Controls */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md flex items-center gap-2">
                    <input 
                        type="text"
                        placeholder="Search by article title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <Button type="submit" variant="secondary" size="sm" className="bg-slate-800 text-slate-200 border-slate-700">Search</Button>
                </form>

                <div className="flex items-center gap-1.5 overflow-x-auto">
                    {['', 'News', 'Blog', 'Industry Guide', 'Tips & Tricks', 'How-To', 'Checklist', 'Guide'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleFilterType(type)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                                (filters.type === type || (!filters.type && !type))
                                    ? 'bg-amber-500 text-slate-950 border-amber-500'
                                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            {type || 'All Subcategories'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filament Datatable */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="p-4">Title & Views</th>
                                <th className="p-4">Subcategory</th>
                                <th className="p-4">Badges & Flags</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-300">
                            {articles.data.map((art) => (
                                <tr key={art.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4 max-w-xs">
                                        <Link href={`/ideas/${art.slug}`} target="_blank" className="font-bold text-white hover:text-amber-400 line-clamp-1 block">
                                            {art.title}
                                        </Link>
                                        <span className="text-[10px] text-slate-400">
                                            👁️ {art.view_count || 120} views • {art.source_rss_name || 'Feed'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                                            {art.content_type}
                                        </span>
                                    </td>
                                    <td className="p-4 space-x-2">
                                        <button
                                            onClick={() => handleToggleTrending(art.id)}
                                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all ${
                                                art.is_trending 
                                                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 font-black' 
                                                    : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-rose-400'
                                            }`}
                                        >
                                            <Flame className="w-3 h-3 inline mr-1" /> Trending
                                        </button>
                                        <button
                                            onClick={() => handleToggleBreaking(art.id)}
                                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all ${
                                                art.is_breaking 
                                                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-black' 
                                                    : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-amber-400'
                                            }`}
                                        >
                                            <Zap className="w-3 h-3 inline mr-1" /> Breaking
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleToggleStatus(art.id)}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all border ${
                                                art.status === 'published' 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' 
                                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                                            }`}
                                        >
                                            {art.status === 'published' ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                                            <span className="capitalize">{art.status || 'published'}</span>
                                        </button>
                                    </td>
                                    <td className="p-4 text-right space-x-3">
                                        <button
                                            onClick={() => setEditingArticle(art)}
                                            className="text-xs font-bold text-amber-400 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(art.id)}
                                            className="text-xs font-bold text-rose-400 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Article Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-white">
                            <h3 className="text-base font-bold font-outfit flex items-center gap-2">
                                <Plus className="w-4 h-4 text-amber-400" /> Create New Article Resource
                            </h3>
                            <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Article Title</label>
                                <input 
                                    type="text"
                                    placeholder="Enter title..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-slate-300 font-bold block mb-1">Subcategory</label>
                                    <select 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                                        value={formData.content_type}
                                        onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
                                    >
                                        <option value="News">News</option>
                                        <option value="Blog">Blog</option>
                                        <option value="Industry Guide">Industry Guide</option>
                                        <option value="Tips & Tricks">Tips & Tricks</option>
                                        <option value="How-To">How-To</option>
                                        <option value="Checklist">Checklist</option>
                                        <option value="Guide">Guide</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-slate-300 font-bold block mb-1">Author</label>
                                    <select 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                                        value={formData.author_id}
                                        onChange={(e) => setFormData({ ...formData, author_id: parseInt(e.target.value) })}
                                    >
                                        {authors.map((aut) => (
                                            <option key={aut.id} value={aut.id}>{aut.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Subtitle Teaser</label>
                                <input 
                                    type="text"
                                    placeholder="Subtitle..."
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                                <Button type="button" variant="outline" size="sm" onClick={() => setShowCreateModal(false)} className="bg-slate-800 text-slate-300 border-slate-700">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                                    Create Article
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Article Modal */}
            {editingArticle && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-white">
                            <h3 className="text-base font-bold font-outfit flex items-center gap-2">
                                <Edit3 className="w-4 h-4 text-amber-400" /> Edit Article Resource
                            </h3>
                            <button onClick={() => setEditingArticle(null)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Title</label>
                                <input 
                                    type="text"
                                    value={editingArticle.title}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Subtitle</label>
                                <input 
                                    type="text"
                                    value={editingArticle.subtitle || ''}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, subtitle: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                                <Button type="button" variant="outline" size="sm" onClick={() => setEditingArticle(null)} className="bg-slate-800 text-slate-300 border-slate-700">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
