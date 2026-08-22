import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
    Filter
} from 'lucide-react';

interface ArticlesPageProps {
    articles: {
        data: any[];
        links: any[];
    };
    categories: any[];
    authors: any[];
    filters: {
        search?: string;
        type?: string;
    };
}

export default function Articles({ articles, categories, authors, filters }: ArticlesPageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [showModal, setShowModal] = useState(false);
    const [syncing, setSyncing] = useState(false);

    // Form state for creating new article
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content_type: 'Blog',
        category_id: categories[0]?.id || 1,
        author_id: authors[0]?.id || 1,
        reading_time: '5 min read',
        source_rss_name: 'Custom Admin Feed',
        content: '<h2>1. Executive Summary</h2><p>Custom administrative playbook content generated from the Master CAP backend.</p>',
    });

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/articles', { ...filters, search }, { preserveState: true });
    };

    const handleFilterType = (type: string) => {
        router.get('/admin/articles', { ...filters, type }, { preserveState: true });
    };

    const handleSyncRss = () => {
        setSyncing(true);
        router.post('/ideas/sync-rss', {}, {
            onFinish: () => setSyncing(false),
        });
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/articles', formData, {
            onSuccess: () => {
                setShowModal(false);
                setFormData({
                    title: '',
                    subtitle: '',
                    content_type: 'Blog',
                    category_id: categories[0]?.id || 1,
                    author_id: authors[0]?.id || 1,
                    reading_time: '5 min read',
                    source_rss_name: 'Custom Admin Feed',
                    content: '<h2>1. Executive Summary</h2><p>Custom administrative playbook content generated from the Master CAP backend.</p>',
                });
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this article?')) {
            router.delete(`/admin/articles/${id}`);
        }
    };

    return (
        <AdminLayout title="Articles & RSS Feed Management">
            <Head title="Admin Articles Management — Bizztopia" />

            {/* Header Action Bar */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold font-outfit text-[#102A3D]">
                        Manage 200 Business Playbooks & RSS Feeds
                    </h1>
                    <p className="text-xs text-[#718797]">
                        View, edit, filter, or create custom articles across all 6 subcategories.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleSyncRss} 
                        isLoading={syncing}
                        className="border-[#287FBA] text-[#0B4778] hover:bg-[#EAF5FC]"
                    >
                        <RefreshCw className="w-4 h-4 mr-1.5" /> Sync RSS
                    </Button>
                    <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => setShowModal(true)}
                    >
                        <Plus className="w-4 h-4 mr-1.5" /> Create New Article
                    </Button>
                </div>
            </div>

            {/* Search & Subcategory Filter Tabs */}
            <div className="bg-white p-4 rounded-2xl border border-[#E6EEF3] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md flex items-center gap-2">
                    <Input 
                        placeholder="Search by article title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        icon={<Search className="w-4 h-4 text-[#718797]" />}
                    />
                    <Button type="submit" variant="secondary" size="sm">Search</Button>
                </form>

                <div className="flex items-center gap-1.5 overflow-x-auto">
                    {['', 'Blog', 'Industry Guide', 'Tips & Tricks', 'How-To', 'Checklist', 'Guide'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleFilterType(type)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                                (filters.type === type || (!filters.type && !type))
                                    ? 'bg-[#0B4778] text-white border-[#0B4778]'
                                    : 'bg-[#F7FAFC] text-[#466071] border-[#E6EEF3] hover:bg-[#EAF5FC]'
                            }`}
                        >
                            {type || 'All Subcategories'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white rounded-2xl border border-[#E6EEF3] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#F7FAFC] border-b border-[#E6EEF3] text-[#718797] uppercase tracking-wider font-bold">
                            <tr>
                                <th className="p-4">Article Title</th>
                                <th className="p-4">Subcategory</th>
                                <th className="p-4">Author</th>
                                <th className="p-4">RSS Source Feed</th>
                                <th className="p-4">Read Time</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E6EEF3]">
                            {articles.data.map((art) => (
                                <tr key={art.id} className="hover:bg-[#F4FAFE] transition-colors">
                                    <td className="p-4 font-bold text-[#102A3D] max-w-sm">
                                        <Link href={`/ideas/${art.slug}`} target="_blank" className="hover:text-[#287FBA] line-clamp-1">
                                            {art.title}
                                        </Link>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant="brand" size="sm">{art.content_type}</Badge>
                                    </td>
                                    <td className="p-4 font-semibold text-[#466071]">
                                        {art.author?.name || 'Editorial Team'}
                                    </td>
                                    <td className="p-4 text-[#718797]">{art.source_rss_name || 'Verified Feed'}</td>
                                    <td className="p-4 font-semibold text-[#466071]">{art.reading_time}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link 
                                            href={`/ideas/${art.slug}`} 
                                            target="_blank" 
                                            className="inline-flex items-center gap-1 text-xs font-bold text-[#287FBA] hover:underline"
                                        >
                                            View <ExternalLink className="w-3 h-3" />
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(art.id)}
                                            className="text-xs font-bold text-[#D95353] hover:underline ml-3"
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
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl border border-[#E6EEF3] shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
                        <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                            <h3 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2">
                                <Plus className="w-5 h-5 text-[#4A9AD4]" /> Create New Business Article / Playbook
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 rounded-lg text-[#718797] hover:bg-[#F4FAFE]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-[#102A3D] block mb-1">Article Title</label>
                                <Input 
                                    placeholder="Enter playbook or guide title..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-[#102A3D] block mb-1">Subcategory</label>
                                    <select 
                                        className="w-full p-2.5 rounded-xl border border-[#E6EEF3] text-xs font-semibold text-[#102A3D] bg-white"
                                        value={formData.content_type}
                                        onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
                                    >
                                        <option value="Blog">Blog</option>
                                        <option value="Industry Guide">Industry Guide</option>
                                        <option value="Tips & Tricks">Tips & Tricks</option>
                                        <option value="How-To">How-To</option>
                                        <option value="Checklist">Checklist</option>
                                        <option value="Guide">Guide</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-[#102A3D] block mb-1">Author</label>
                                    <select 
                                        className="w-full p-2.5 rounded-xl border border-[#E6EEF3] text-xs font-semibold text-[#102A3D] bg-white"
                                        value={formData.author_id}
                                        onChange={(e) => setFormData({ ...formData, author_id: parseInt(e.target.value) })}
                                    >
                                        {authors.map((aut) => (
                                            <option key={aut.id} value={aut.id}>{aut.name} ({aut.role_title})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-[#102A3D] block mb-1">Subtitle / Executive Summary</label>
                                <Input 
                                    placeholder="Short 1-2 sentence summary..."
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                />
                            </div>

                            <div className="pt-3 border-t border-[#E6EEF3] flex items-center justify-end gap-3">
                                <Button type="button" variant="outline" size="sm" onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm">
                                    Publish Article
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
