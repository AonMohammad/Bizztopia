import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { MessageSquare, ThumbsUp, CheckCircle, User } from 'lucide-react';
import { Badge } from './Badge';
import { Avatar } from './Avatar';

export interface QuestionCardProps {
    id: number;
    title: string;
    slug: string;
    body: string;
    category?: string;
    authorName?: string;
    authorRole?: string;
    upvotesCount?: number;
    answersCount?: number;
    isSolved?: boolean;
    createdAt?: string;
    className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    id,
    title,
    slug,
    body,
    category = 'General Business',
    authorName = 'Community Member',
    authorRole,
    upvotesCount: initialUpvotes = 0,
    answersCount = 0,
    isSolved = false,
    createdAt,
    className = ''
}) => {
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [upvoted, setUpvoted] = useState(false);

    const handleUpvote = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (upvoted) return;

        setUpvotes((prev) => prev + 1);
        setUpvoted(true);

        try {
            await fetch(`/social/questions/${id}/upvote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
            });
        } catch (err) {
            console.error('Failed to upvote:', err);
        }
    };

    return (
        <div 
            className={`
                bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs 
                hover:shadow-md hover:border-[#4A9AD4]/40 transition-all duration-300 space-y-4
                ${className}
            `}
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">{category}</Badge>
                    {isSolved && (
                        <Badge variant="success" size="sm">
                            <CheckCircle className="w-3 h-3 mr-1" /> Solved
                        </Badge>
                    )}
                </div>
                {createdAt && <span className="text-xs text-[#718797]">{createdAt}</span>}
            </div>

            <Link href={`/social/questions/${slug}`} className="block group">
                <h3 className="text-xl font-bold font-outfit text-[#102A3D] group-hover:text-[#287FBA] transition-colors leading-snug">
                    {title}
                </h3>
            </Link>

            <p className="text-xs text-[#466071] line-clamp-2 leading-relaxed">
                {body}
            </p>

            <div className="pt-4 border-t border-[#E6EEF3] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                    <Avatar name={authorName} size="sm" />
                    <div>
                        <div className="font-semibold text-[#102A3D]">{authorName}</div>
                        {authorRole && <div className="text-[10px] text-[#718797]">{authorRole}</div>}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleUpvote}
                        className={`
                            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                            ${upvoted 
                                ? 'bg-[#EAF5FC] text-[#287FBA] border border-[#8FC7E8]' 
                                : 'bg-[#F7FAFC] text-[#466071] hover:bg-[#EEF4F8] hover:text-[#102A3D]'}
                        `}
                    >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{upvotes}</span>
                    </button>

                    <Link 
                        href={`/social/questions/${slug}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7FAFC] text-[#466071] hover:bg-[#EEF4F8] hover:text-[#102A3D] font-semibold transition-all"
                    >
                        <MessageSquare className="w-3.5 h-3.5 text-[#4A9AD4]" />
                        <span>{answersCount} {answersCount === 1 ? 'Answer' : 'Answers'}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
