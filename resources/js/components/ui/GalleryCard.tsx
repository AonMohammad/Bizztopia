import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Bookmark, Eye, Image as ImageIcon, MapPin } from 'lucide-react';
import { Badge } from './Badge';

export interface GalleryCardProps {
    id: number;
    title: string;
    slug: string;
    heroImage?: string;
    category?: string;
    clientName?: string;
    location?: string;
    viewsCount?: number;
    bookmarksCount?: number;
    imagesCount?: number;
    className?: string;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
    id,
    title,
    slug,
    heroImage,
    category = 'Workspaces',
    clientName,
    location,
    viewsCount = 0,
    bookmarksCount: initialBookmarks = 0,
    imagesCount = 1,
    className = ''
}) => {
    const [bookmarks, setBookmarks] = useState(initialBookmarks);
    const [bookmarked, setBookmarked] = useState(false);

    const handleBookmark = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (bookmarked) return;

        setBookmarks((prev) => prev + 1);
        setBookmarked(true);

        try {
            await fetch(`/inspire/${id}/bookmark`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
            });
        } catch (err) {
            console.error('Failed to bookmark gallery:', err);
        }
    };

    return (
        <div 
            className={`
                group rounded-2xl bg-white border border-[#E6EEF3] shadow-xs hover:shadow-md 
                hover:border-[#4A9AD4]/40 transition-all duration-300 flex flex-col overflow-hidden
                ${className}
            `}
        >
            {/* Image Box */}
            <div className="relative h-64 overflow-hidden bg-[#EEF4F8]">
                {heroImage ? (
                    <img 
                        src={heroImage} 
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-white/50" />
                    </div>
                )}

                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <Badge variant="primary" size="sm" className="backdrop-blur-md bg-[#062F52]/80 text-white">
                        {category}
                    </Badge>
                    {imagesCount > 1 && (
                        <Badge variant="secondary" size="sm" className="backdrop-blur-md bg-black/50 text-white">
                            <ImageIcon className="w-3 h-3 mr-1" /> {imagesCount} Photos
                        </Badge>
                    )}
                </div>

                <button 
                    onClick={handleBookmark}
                    className={`
                        absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-xs
                        ${bookmarked 
                            ? 'bg-[#287FBA] text-white' 
                            : 'bg-black/40 text-white hover:bg-black/60'}
                    `}
                >
                    <Bookmark className="w-4 h-4" />
                </button>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                    <Link href={`/inspire/${slug}`} className="block group-hover:text-[#287FBA] transition-colors">
                        <h3 className="text-lg font-bold font-outfit text-[#102A3D] line-clamp-2 leading-snug">
                            {title}
                        </h3>
                    </Link>

                    {clientName && (
                        <p className="text-xs text-[#466071] font-medium">
                            {clientName} {location && <span className="text-[#718797]">• {location}</span>}
                        </p>
                    )}
                </div>

                {/* Footer Metrics */}
                <div className="pt-4 border-t border-[#E6EEF3] flex items-center justify-between text-xs text-[#718797]">
                    <span className="flex items-center gap-1 font-medium">
                        <Eye className="w-3.5 h-3.5 text-[#4A9AD4]" /> {viewsCount} Views
                    </span>
                    <span className="font-semibold text-[#287FBA]">{bookmarks} Saves</span>
                </div>
            </div>
        </div>
    );
};
