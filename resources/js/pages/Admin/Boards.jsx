import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Layers, Edit3, ToggleLeft, ToggleRight, Megaphone, Sparkles, X, Plus, Trash2 } from 'lucide-react';

export default function Boards({ boards }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingBoard, setEditingBoard] = useState(null);

    const [createForm, setCreateForm] = useState({
        name: '',
        layout_type: 'hero_split',
        category_filter: '',
        ad_type: 'google_ads',
        ad_code: '<!-- Google AdSense Leaderboard Banner (728x90) -->\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-bizztopia-7890" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>',
    });

    const handleToggleStatus = (boardId) => {
        router.patch(`/admin/boards/${boardId}/toggle-status`, {}, { preserveScroll: true });
    };

    const handleDelete = (boardId) => {
        if (confirm('Are you sure you want to delete this custom board?')) {
            router.delete(`/admin/boards/${boardId}`);
        }
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        router.post('/admin/boards', createForm, {
            onSuccess: () => {
                setShowCreateModal(false);
                setCreateForm({
                    name: '',
                    layout_type: 'hero_split',
                    category_filter: '',
                    ad_type: 'google_ads',
                    ad_code: '',
                });
            },
        });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!editingBoard) return;

        router.put(`/admin/boards/${editingBoard.id}`, editingBoard, {
            onSuccess: () => setEditingBoard(null),
        });
    };

    return (
        <AdminLayout title="Editorial Boards & Ad Spaces Resource">
            <Head title="Editorial Boards — Filament Admin" />

            {/* Action Bar */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold font-outfit text-white">
                        Editorial Newspaper Boards & Google Ads Spaces
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Manage non-overlapping BBC News-style grid boards, add custom boards, and configure Google Ads AdSense spaces.
                    </p>
                </div>

                <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shrink-0"
                >
                    <Plus className="w-4 h-4 mr-1.5" /> Create Custom Board
                </Button>
            </div>

            {/* Boards Grid */}
            <div className="space-y-4">
                <h3 className="text-base font-bold font-outfit text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" /> Active Editorial Boards Table ({boards.length})
                </h3>

                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                            <tr>
                                <th className="p-4">Board Name</th>
                                <th className="p-4">Layout Type</th>
                                <th className="p-4">Category Filter</th>
                                <th className="p-4">Ad Space Unit</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-300">
                            {boards.map((board) => (
                                <tr key={board.id} className="hover:bg-slate-800/50">
                                    <td className="p-4 font-bold text-white max-w-xs">{board.name}</td>
                                    <td className="p-4">
                                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase">
                                            {board.layout_type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-400 font-semibold">{board.category_filter || 'All Categories'}</td>
                                    <td className="p-4">
                                        <span className="bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded text-[10px] font-bold">
                                            {board.ad_type}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleToggleStatus(board.id)}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all border ${
                                                board.is_active 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                                            }`}
                                        >
                                            {board.is_active ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                                            <span>{board.is_active ? 'Active' : 'Disabled'}</span>
                                        </button>
                                    </td>
                                    <td className="p-4 text-right space-x-3">
                                        <button 
                                            onClick={() => setEditingBoard(board)}
                                            className="text-xs font-bold text-amber-400 hover:underline"
                                        >
                                            Edit Board & Ads
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(board.id)}
                                            className="text-xs font-bold text-rose-400 hover:underline ml-2"
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

            {/* Create Custom Board Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-white">
                            <h3 className="text-base font-bold font-outfit flex items-center gap-2">
                                <Plus className="w-4 h-4 text-amber-400" /> Create Custom Editorial Board
                            </h3>
                            <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Board Name Title</label>
                                <input 
                                    type="text"
                                    placeholder="e.g. Founder Case Studies, Market Headlines..."
                                    value={createForm.name}
                                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-slate-300 font-bold block mb-1">Layout Style</label>
                                    <select 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                                        value={createForm.layout_type}
                                        onChange={(e) => setCreateForm({ ...createForm, layout_type: e.target.value })}
                                    >
                                        <option value="hero_split">BBC News Hero Split Grid</option>
                                        <option value="4_column_masonry">4-Column Masonry Grid</option>
                                        <option value="spotlight_digest">Spotlight & Stacked Digest Grid</option>
                                        <option value="market_grid">Market Intelligence 3-Col Grid</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-slate-300 font-bold block mb-1">Subcategory Filter</label>
                                    <select 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                                        value={createForm.category_filter}
                                        onChange={(e) => setCreateForm({ ...createForm, category_filter: e.target.value })}
                                    >
                                        <option value="">All Categories</option>
                                        <option value="News">Market News</option>
                                        <option value="Blog">Blogs</option>
                                        <option value="Industry Guide">Industry Guides</option>
                                        <option value="Tips & Tricks">Tips & Tricks</option>
                                        <option value="How-To">How-To Articles</option>
                                        <option value="Checklist">Checklists</option>
                                        <option value="Guide">Guides</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Ad Space Type</label>
                                <select 
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                                    value={createForm.ad_type}
                                    onChange={(e) => setCreateForm({ ...createForm, ad_type: e.target.value })}
                                >
                                    <option value="google_ads">Google AdSense Space (728x90)</option>
                                    <option value="engage_poll">Engage Interactive Poll Unit</option>
                                    <option value="engage_quiz">Engage Diagnostic Quiz Unit</option>
                                    <option value="custom_banner">Custom Banner HTML</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Google AdSense HTML Code / Tag</label>
                                <textarea 
                                    rows={3}
                                    placeholder="Paste Google AdSense <ins class='adsbygoogle'...</ins> tag..."
                                    value={createForm.ad_code}
                                    onChange={(e) => setCreateForm({ ...createForm, ad_code: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-mono text-[11px] focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                                <Button type="button" variant="outline" size="sm" onClick={() => setShowCreateModal(false)} className="bg-slate-800 text-slate-300 border-slate-700">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                                    Create Board
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Board & Ads Modal */}
            {editingBoard && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-white">
                            <h3 className="text-base font-bold font-outfit flex items-center gap-2">
                                <Edit3 className="w-4 h-4 text-amber-400" /> Edit Board Layout & Google Ads Space
                            </h3>
                            <button onClick={() => setEditingBoard(null)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Board Name</label>
                                <input 
                                    type="text"
                                    value={editingBoard.name}
                                    onChange={(e) => setEditingBoard({ ...editingBoard, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-slate-300 font-bold block mb-1">Layout Style</label>
                                    <select 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                                        value={editingBoard.layout_type}
                                        onChange={(e) => setEditingBoard({ ...editingBoard, layout_type: e.target.value })}
                                    >
                                        <option value="hero_split">BBC News Hero Split Grid</option>
                                        <option value="4_column_masonry">4-Column Masonry Grid</option>
                                        <option value="spotlight_digest">Spotlight & Stacked Digest Grid</option>
                                        <option value="market_grid">Market Intelligence 3-Col Grid</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-slate-300 font-bold block mb-1">Subcategory Filter</label>
                                    <select 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                                        value={editingBoard.category_filter || ''}
                                        onChange={(e) => setEditingBoard({ ...editingBoard, category_filter: e.target.value })}
                                    >
                                        <option value="">All Categories</option>
                                        <option value="News">Market News</option>
                                        <option value="Blog">Blogs</option>
                                        <option value="Industry Guide">Industry Guides</option>
                                        <option value="Tips & Tricks">Tips & Tricks</option>
                                        <option value="How-To">How-To Articles</option>
                                        <option value="Checklist">Checklists</option>
                                        <option value="Guide">Guides</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Ad Space Type</label>
                                <select 
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                                    value={editingBoard.ad_type}
                                    onChange={(e) => setEditingBoard({ ...editingBoard, ad_type: e.target.value })}
                                >
                                    <option value="google_ads">Google AdSense Space (728x90)</option>
                                    <option value="engage_poll">Engage Interactive Poll Unit</option>
                                    <option value="engage_quiz">Engage Diagnostic Quiz Unit</option>
                                    <option value="custom_banner">Custom Banner HTML</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Google AdSense HTML Code / Tag</label>
                                <textarea 
                                    rows={4}
                                    placeholder="Paste Google AdSense <ins class='adsbygoogle'...</ins> tag here..."
                                    value={editingBoard.ad_code || ''}
                                    onChange={(e) => setEditingBoard({ ...editingBoard, ad_code: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-mono text-[11px] focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                                <Button type="button" variant="outline" size="sm" onClick={() => setEditingBoard(null)} className="bg-slate-800 text-slate-300 border-slate-700">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                                    Save Board & Ads
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
