import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Star, MessageSquare, Check, X, ShieldCheck } from 'lucide-react';

interface ReviewsPageProps {
    reviews: {
        data: any[];
        links: any[];
    };
    questions: {
        data: any[];
        links: any[];
    };
}

export default function Reviews({ reviews, questions }: ReviewsPageProps) {
    const handleStatus = (reviewId: number, status: string) => {
        router.patch(`/admin/reviews/${reviewId}/status`, { status });
    };

    return (
        <AdminLayout title="Reviews & Community Moderation">
            <Head title="Admin Moderation — Bizztopia" />

            <div className="space-y-8">
                {/* Section 1: Client Verified Reviews */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#4A9AD4]" /> Moderate Client Trust Reviews
                    </h2>

                    <div className="bg-white rounded-2xl border border-[#E6EEF3] shadow-xs overflow-hidden">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#F7FAFC] border-b border-[#E6EEF3] text-[#718797] uppercase tracking-wider font-bold">
                                <tr>
                                    <th className="p-4">Client Name</th>
                                    <th className="p-4">Company</th>
                                    <th className="p-4">Rating</th>
                                    <th className="p-4">Comment</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Moderation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E6EEF3]">
                                {reviews.data.map((rev) => (
                                    <tr key={rev.id} className="hover:bg-[#F4FAFE]">
                                        <td className="p-4 font-bold text-[#102A3D]">{rev.client_name}</td>
                                        <td className="p-4 text-[#466071]">{rev.company_name || 'Individual Client'}</td>
                                        <td className="p-4 font-bold text-[#F59E0B]">★ {rev.rating}.0</td>
                                        <td className="p-4 text-[#466071] max-w-xs truncate">{rev.comment}</td>
                                        <td className="p-4">
                                            <Badge variant={rev.status === 'approved' ? 'success' : 'secondary'} size="sm">
                                                {rev.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            {rev.status !== 'approved' && (
                                                <button
                                                    onClick={() => handleStatus(rev.id, 'approved')}
                                                    className="text-xs font-bold text-[#249A68] hover:underline"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {rev.status !== 'rejected' && (
                                                <button
                                                    onClick={() => handleStatus(rev.id, 'rejected')}
                                                    className="text-xs font-bold text-[#D95353] hover:underline ml-2"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Section 2: Q&A Community Threads */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-[#4A9AD4]" /> Community Forum Questions
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {questions.data.map((q) => (
                            <div key={q.id} className="bg-white p-5 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <Badge variant="brand" size="sm">{q.category || 'General'}</Badge>
                                    <span className="text-[#718797] font-semibold">{q.answers_count || 0} Answers</span>
                                </div>
                                <h4 className="text-sm font-bold text-[#102A3D]">{q.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
