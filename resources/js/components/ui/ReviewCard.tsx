import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { Badge } from './Badge';

export interface ReviewCardProps {
    id: number;
    reviewerName: string;
    businessName: string;
    serviceCategory: string;
    rating: number;
    title: string;
    reviewBody: string;
    isVerified?: boolean;
    createdAt?: string;
    className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
    reviewerName,
    businessName,
    serviceCategory,
    rating = 5,
    title,
    reviewBody,
    isVerified = true,
    createdAt,
    className = ''
}) => {
    return (
        <div 
            className={`
                bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs 
                hover:shadow-md transition-all duration-300 space-y-4
                ${className}
            `}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#D4E0E7]'}`} 
                        />
                    ))}
                </div>
                {isVerified && (
                    <Badge variant="success" size="sm">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Verified Client
                    </Badge>
                )}
            </div>

            <div className="space-y-1">
                <h4 className="text-base font-bold text-[#102A3D] font-outfit">
                    "{title}"
                </h4>
                <p className="text-xs text-[#466071] line-clamp-3 leading-relaxed">
                    {reviewBody}
                </p>
            </div>

            <div className="pt-4 border-t border-[#E6EEF3] flex items-center justify-between text-xs">
                <div>
                    <span className="font-bold text-[#102A3D] block">{reviewerName}</span>
                    <span className="text-[10px] text-[#718797]">Client Review</span>
                </div>
                <div className="text-right">
                    <span className="font-semibold text-[#0B4778] block">{businessName}</span>
                    <span className="text-[10px] text-[#718797]">{serviceCategory}</span>
                </div>
            </div>
        </div>
    );
};
