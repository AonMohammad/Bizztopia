import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Star, MessageSquare, Check, Trash2, Plus, X } from 'lucide-react';

export default function Reviews({ reviews, questions }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        client_name: '',
        company_name: '',
        rating: 5,
        comment: '',
    });

    const handleStatus = (reviewId, status) => {
        router.patch(`/admin/reviews/${reviewId}/status`, { status });
    };

    const handleDelete = (reviewId) => {
        if (confirm('Are you sure you want to delete this review?')) {
            router.delete(`/admin/reviews/${reviewId}`);
        }
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        router.post('/admin/reviews', formData, {
            onSuccess: () => {
                setShowModal(false);
                setFormData({
                    client_name: '',
                    company_name: '',
                    rating: 5,
                    comment: '',
                });
            },
        });
    };

    return (
        <AdminLayout title="Reviews & Community Resource">
            <Head title="Reviews Resource — Filament Admin" />

            {/* Header Action Bar */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold font-outfit text-white">
                        Client Reviews & Social Trust Moderation
                    </h2>
                    <p className="text-xs text-[#718797] mt-0.5">
                        Perform all CRUD operations: Moderate, Create Review, Approve/Reject, and Delete.
                    </p>
                </div>

                <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => setShowModal(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shrink-0"
                >
                    <Plus className="w-4 h-4 mr-1.5" /> Add Client Review
                </Button>
            </div>

            {/* Client Reviews Table */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                        <tr>
                            <th className="p-4">Client Name</th>
                            <th className="p-4">Company</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Comment</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                        {reviews.data.map((rev) => (
                            <tr key={rev.id} className="hover:bg-slate-800/50">
                                <td className="p-4 font-bold text-white">{rev.client_name}</td>
                                <td className="p-4 text-slate-400">{rev.company_name || 'Individual Client'}</td>
                                <td className="p-4 font-bold text-amber-400">★ {rev.rating}.0</td>
                                <td className="p-4 text-slate-300 max-w-xs truncate">{rev.comment}</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                        rev.status === 'approved' 
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                    }`}>
                                        {rev.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-3">
                                    {rev.status !== 'approved' && (
                                        <button
                                            onClick={() => handleStatus(rev.id, 'approved')}
                                            className="text-xs font-bold text-emerald-400 hover:underline"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleDelete(rev.id)}
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

            {/* Create Review Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-white">
                            <h3 className="text-base font-bold font-outfit flex items-center gap-2">
                                <Plus className="w-4 h-4 text-amber-400" /> Create Client Review Resource
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Client Name</label>
                                <input 
                                    type="text"
                                    placeholder="Enter client name..."
                                    value={formData.client_name}
                                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Company Name</label>
                                <input 
                                    type="text"
                                    placeholder="Enter company..."
                                    value={formData.company_name}
                                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Star Rating (1 - 5)</label>
                                <select 
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                >
                                    <option value={5}>5 Stars (Excellent)</option>
                                    <option value={4}>4 Stars (Very Good)</option>
                                    <option value={3}>3 Stars (Average)</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-slate-300 font-bold block mb-1">Comment / Feedback</label>
                                <textarea 
                                    rows={3}
                                    placeholder="Enter testimonial text..."
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                                    required
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                                <Button type="button" variant="outline" size="sm" onClick={() => setShowModal(false)} className="bg-slate-800 text-slate-300 border-slate-700">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                                    Publish Review
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
