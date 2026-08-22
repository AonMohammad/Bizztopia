import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Vote, Sparkles, Plus, CheckCircle2, ToggleLeft, ToggleRight, Trash2, X } from 'lucide-react';

export default function Polls({ polls, quizzes }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Marketing',
        description: 'Help benchmark industry growth tactics.',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    });

    const handleToggleStatus = (id) => {
        router.patch(`/admin/polls/${id}/toggle-status`, {}, { preserveScroll: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this poll?')) {
            router.delete(`/admin/polls/${id}`);
        }
    };

    const handleOptionChange = (idx, value) => {
        const updated = [...formData.options];
        updated[idx] = value;
        setFormData({ ...formData, options: updated });
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        router.post('/admin/polls', formData, {
            onSuccess: () => {
                setShowModal(false);
                setFormData({
                    title: '',
                    category: 'Marketing',
                    description: 'Help benchmark industry growth tactics.',
                    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                });
            },
        });
    };

    return (
        <AdminLayout title="Polls & Diagnostics Resource">
            <Head title="Polls Resource — Filament Admin" />

            {/* Filament Action Bar */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold font-outfit text-white">
                        Engage Interactive Polls & Quizzes
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Perform all CRUD operations: Create Polls, Toggle Status, Reset Votes, and Delete.
                    </p>
                </div>

                <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => setShowModal(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shrink-0"
                >
                    <Plus className="w-4 h-4 mr-1.5" /> Create New Poll
                </Button>
            </div>

            {/* Polls Grid */}
            <div className="space-y-4">
                <h3 className="text-base font-bold font-outfit text-white flex items-center gap-2">
                    <Vote className="w-4 h-4 text-amber-400" /> Active Industry Polls Resource Table
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {polls.data.map((poll) => (
                        <div key={poll.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xs">
                            <div className="flex items-center justify-between">
                                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded text-[10px] font-bold">
                                    {poll.category}
                                </span>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleStatus(poll.id)}
                                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all border ${
                                            poll.status === 'active' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                                : 'bg-slate-800 text-slate-400 border-slate-700'
                                        }`}
                                    >
                                        {poll.status === 'active' ? <ToggleRight className="w-3.5 h-3.5 text-emerald-400" /> : <ToggleLeft className="w-3.5 h-3.5 text-slate-400" />}
                                        <span className="capitalize">{poll.status}</span>
                                    </button>

                                    <button 
                                        onClick={() => handleDelete(poll.id)}
                                        className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <h4 className="text-sm font-bold font-outfit text-white">
                                {poll.title}
                            </h4>

                            <div className="space-y-2 pt-2 border-t border-slate-800">
                                {poll.options?.map((opt) => (
                                    <div key={opt.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                                        <span className="font-medium text-slate-200">{opt.option_text}</span>
                                        <span className="font-bold text-amber-400">{opt.votes_count} votes</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Poll Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-white">
                            <h3 className="text-base font-bold font-outfit flex items-center gap-2">
                                <Plus className="w-4 h-4 text-amber-400" /> Create New Interactive Poll Resource
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Poll Title / Question</label>
                                <input 
                                    type="text"
                                    placeholder="Enter poll question..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Category</label>
                                <input 
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-slate-300 font-bold block">Poll Options</label>
                                {formData.options.map((opt, idx) => (
                                    <input 
                                        key={idx}
                                        type="text"
                                        placeholder={`Option ${idx + 1}`}
                                        value={opt}
                                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                                        required
                                    />
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                                <Button type="button" variant="outline" size="sm" onClick={() => setShowModal(false)} className="bg-slate-800 text-slate-300 border-slate-700">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                                    Publish Poll
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
