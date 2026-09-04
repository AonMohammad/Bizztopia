import React from 'react';
import { Link } from '@inertiajs/react';
import { Clock, User, Sparkles, Flame, Zap, Eye, ImageIcon } from 'lucide-react';
import { Badge } from './Badge';

export interface ArticleCardProps {
    id: number;
    title: string;
    slug: string;
    subtitle?: string;
    heroImage?: string;
    category?: {
        name: string;
        slug: string;
    };
    tags?: Array<{
        id: number;
        name: string;
        color?: string;
    }>;
    readingTimeMinutes?: number;
    author?: {
        name: string;
        role?: string;
    };
    publishedAt?: string;
    isTrending?: boolean;
    isBreaking?: boolean;
    viewCount?: number;
    variant?: 'featured' | 'compact' | 'standard';
    className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
    id,
    title,
    slug,
    subtitle,
    heroImage,
    category,
    tags = [],
    readingTimeMinutes = 5,
    author,
    publishedAt,
    isTrending = false,
    isBreaking = false,
    viewCount,
    variant = 'standard',
    className = ''
}) => {
    const getCardDimensions = () => {
        switch (variant) {
            case 'featured':
                return 'w-[360px] sm:w-[420px]';
            case 'compact':
                return 'w-[250px] sm:w-[270px]';
            case 'standard':
            default:
                return 'w-[300px] sm:w-[330px]';
        }
    };

    return (
        <Link
            href={`/ideas/${slug}`}
            className={`
                group flex flex-col h-full rounded-2xl border bg-white
                overflow-hidden transition-all duration-300 ease-out transform-gpu shrink-0
                hover:scale-[1.04] hover:shadow-2xl hover:border-[#287FBA]
                border-[#E6EEF3] cursor-pointer
                ${getCardDimensions()}
                ${className}
            `}
        >
            {/* Hero Image */}
            {heroImage ? (
                <div
                    className="relative w-full overflow-hidden flex-shrink-0"
                    style={{ height: variant === 'featured' ? '160px' : '110px' }}
                >
                    <img
                        src={heroImage}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102A3D]/50 via-transparent to-transparent" />

                    {/* Status badges on image */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                        {isBreaking && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black uppercase tracking-wider">
                                <Zap className="w-2.5 h-2.5" /> Breaking
                            </span>
                        )}
                        {isTrending && !isBreaking && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-orange-500 text-white text-[9px] font-black uppercase tracking-wider">
                                <Flame className="w-2.5 h-2.5" /> Trending
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <div
                    className="w-full flex items-center justify-center flex-shrink-0 relative"
                    style={{
                        height: variant === 'featured' ? '90px' : '64px',
                        background: 'linear-gradient(135deg, #102A3D, #287FBA)'
                    }}
                >
                    <ImageIcon className="w-7 h-7 text-white/25" />
                </div>
            )}

            {/* Card Body */}
            <div className="p-4 flex flex-col flex-grow space-y-2">
                {/* Category & Status badges */}
                <div className="flex items-center justify-between gap-1.5 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {category ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold text-[#287FBA] bg-[#EAF5FC] border border-[#8FC7E8]/40">
                                {category.name}
                            </span>
                        ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold text-[#466071] bg-[#F7FAFC] border border-[#E6EEF3]">
                                Playbook
                            </span>
                        )}

                        {isBreaking && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                                <Zap className="w-2.5 h-2.5" /> Breaking
                            </span>
                        )}
                        {isTrending && !isBreaking && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                                <Flame className="w-2.5 h-2.5" /> Trending
                            </span>
                        )}
                    </div>
                    {variant === 'featured' && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#287FBA] flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Lead Story
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className={`
                    font-bold font-outfit text-[#102A3D] group-hover:text-[#287FBA]
                    transition-colors leading-snug
                    ${variant === 'featured' ? 'text-base sm:text-lg line-clamp-3' : 'text-sm line-clamp-2'}
                `}>
                    {title}
                </h3>

                {/* Subtitle */}
                {subtitle && (
                    <p className={`text-xs text-[#466071] leading-relaxed font-normal ${variant === 'featured' ? 'line-clamp-3' : 'line-clamp-2'}`}>
                        {subtitle}
                    </p>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                        {tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag.id}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border"
                                style={{
                                    color: tag.color,
                                    borderColor: `${tag.color}40`,
                                    backgroundColor: `${tag.color}10`,
                                }}
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-[#F7FAFC] border-t border-[#E6EEF3] flex items-center justify-between text-xs text-[#718797] mt-auto">
                <div className="flex items-center gap-1.5 font-semibold truncate max-w-[160px]">
                    <User className="w-3.5 h-3.5 text-[#4A9AD4] shrink-0" />
                    <span className="truncate">{author?.name || 'Editorial Desk'}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#466071] shrink-0">
                    {viewCount !== undefined && viewCount !== null && (
                        <span className="flex items-center gap-0.5 text-slate-500">
                            <Eye className="w-3.5 h-3.5 text-[#4A9AD4]" /> {typeof viewCount === 'number' ? viewCount.toLocaleString() : viewCount}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#4A9AD4]" /> {readingTimeMinutes}m
                    </span>
                </div>
            </div>
        </Link>
    );
};
