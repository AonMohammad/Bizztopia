import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Layers, Edit3, ToggleLeft, ToggleRight, Megaphone, Sparkles, X, Plus, Trash2 } from 'lucide-react';

interface BoardsProps {
    boards: any[];
}

export default function Boards({ boards }: BoardsProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingBoard, setEditingBoard] = useState<any>(null);

    const [createForm, setCreateForm] = useState({
        name: '',
        layout_type: 'hero_split',
        category_filter: '',
        ad_type: 'google_ads',
        ad_code: '<!-- Google AdSense Leaderboard Banner (728x90) -->\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-bizztopia-7890" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>',
    });

    const handleToggleStatus = (boardId: number) => {
        router.patch(`/admin/boards/${boardId}/toggle-status`, {}, { preserveScroll: true });
    };

    const handleDelete = (boardId: number) => {
        if (confirm('Are you sure you want to delete this custom board?')) {
            router.delete(`/admin/boards/${boardId}`);
        }
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
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

    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingBoard) return;

        router.put(`/admin/boards/${editingBoard.id}`, editingBoard, {
            onSuccess: () => setEditingBoard(null),
        });
    };

    return (
        <AdminLayout title="Editorial Boards & Ad Spaces">
            <Head title="Editorial Boards & Ad Spaces — Bizztopia Admin" />

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Editorial Board & Ad Management</h2>
                        <p className="text-xs text-[#718797]">Configure custom editorial category layouts, Google AdSense slots, and interactive engagement units.</p>
                    </div>
                    <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
                        <Plus className="w-4 h-4 mr-1.5" /> Create Custom Board
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {boards.map((board) => (
                        <div key={board.id} className="bg-white p-6 rounded-2xl border border-[#E6EEF3] space-y-4 shadow-xs">
                            <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                                <div>
                                    <h3 className="font-bold text-sm text-[#102A3D]">{board.name}</h3>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#287FBA]">{board.layout_type}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleStatus(board.id)}
                                        className={`p-1 rounded-lg ${board.is_active ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}
                                    >
                                        {board.is_active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                                    </button>
                                    <button onClick={() => setEditingBoard(board)} className="p-1 text-[#287FBA] hover:bg-blue-50 rounded-lg">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(board.id)} className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs text-slate-600 space-y-1">
                                <div><strong>Ad Unit Type:</strong> {board.ad_type}</div>
                                <div><strong>Category Filter:</strong> {board.category_filter || 'All Categories'}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
