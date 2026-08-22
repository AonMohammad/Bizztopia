import React from 'react';
import { Link } from '@inertiajs/react';
import { Clock, User } from 'lucide-react';
import { Badge } from './Badge';

export interface ArticleCardProps {
    id: number;
    title: string;
    slug: string;
    subtitle?: string;
    category?: {
        name: string;
        slug: string;
    };
    readingTimeMinutes?: number;
    author?: {
        name: string;
        role?: string;
    };
    publishedAt?: string;
    className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
    id,
    title,
    slug,
    subtitle,
    category,
    readingTimeMinutes = 5,
    author,
    className = ''
}) => {
    return (
        <article 
            className={`
                group flex flex-col justify-between h-full bg-white rounded-2xl border border-[#E6EEF3]
                overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1
                ${className}
            `}
        >
            <div className="p-4 flex flex-col flex-grow space-y-3">
                {/* Category Badge */}
                <div className="flex items-center justify-between gap-2">
                    {category ? (
                        <Badge variant="brand" size="sm">
                            {category.name}
                        </Badge>
                    ) : (
                        <Badge variant="secondary" size="sm">
                            Playbook
                        </Badge>
                    )}
                </div>

                {/* Article Title */}
                <h3 className="text-sm font-bold font-outfit text-[#102A3D] group-hover:text-[#287FBA] transition-colors leading-snug line-clamp-2">
                    <Link href={`/ideas/${slug}`}>
                        {title}
                    </Link>
                </h3>

                {/* Subtitle / Teaser */}
                {subtitle && (
                    <p className="text-xs text-[#466071] line-clamp-2 leading-relaxed font-normal">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Footer Meta Details */}
            <div className="px-4 py-2.5 bg-[#F7FAFC] border-t border-[#E6EEF3] flex items-center justify-between text-xs text-[#718797]">
                <div className="flex items-center gap-1.5 font-medium truncate max-w-[150px]">
                    <User className="w-3.5 h-3.5 text-[#4A9AD4] shrink-0" />
                    <span className="truncate">{author?.name || 'Editorial Team'}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#466071] shrink-0">
                    <Clock className="w-3 h-3 text-[#4A9AD4]" />
                    <span>{readingTimeMinutes} min</span>
                </div>
            </div>
        </article>
    );
};
