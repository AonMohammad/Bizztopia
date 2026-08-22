import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GalleryCard } from '@/components/ui/GalleryCard';
import { 
    ArrowLeft, 
    Bookmark, 
    Eye, 
    MapPin, 
    UserCheck,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Calculator
} from 'lucide-react';

interface GalleryImageItem {
    id: number;
    image_url: string;
    caption: string;
    alt_text: string;
    credit_name: string;
}

interface GalleryDetail {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    hero_image: string;
    client_name: string;
    location: string;
    views_count: number;
    bookmarks_count: number;
    images: GalleryImageItem[];
}

interface InspireShowProps {
    gallery: GalleryDetail;
    relatedGalleries: GalleryDetail[];
}

export default function Show({ gallery, relatedGalleries }: InspireShowProps) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const activeImage = gallery.images.length > 0 ? gallery.images[activeImageIndex] : null;

    const nextImage = () => {
        if (gallery.images.length > 0) {
            setActiveImageIndex((prev) => (prev + 1) % gallery.images.length);
        }
    };

    const prevImage = () => {
        if (gallery.images.length > 0) {
            setActiveImageIndex((prev) => (prev - 1 + gallery.images.length) % gallery.images.length);
        }
    };

    return (
        <AppLayout>
            <Head title={`${gallery.title} — Bizztopia Inspire`} />

            <article className="py-12 bg-[#F7FAFC]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Back Navigation Bar */}
                    <div className="flex items-center justify-between">
                        <Link 
                            href="/inspire" 
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#287FBA] hover:text-[#0B4778] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Visual Discovery
                        </Link>
                    </div>

                    {/* Gallery Header Card */}
                    <div className="bg-white p-8 rounded-2xl border border-[#E6EEF3] shadow-sm space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="primary" size="md">{gallery.category}</Badge>
                            {gallery.location && (
                                <Badge variant="neutral" size="md">
                                    <MapPin className="w-3.5 h-3.5 mr-1" /> {gallery.location}
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-[#102A3D]">
                            {gallery.title}
                        </h1>

                        {gallery.description && (
                            <p className="text-base text-[#466071] leading-relaxed">
                                {gallery.description}
                            </p>
                        )}

                        <div className="pt-4 border-t border-[#E6EEF3] flex flex-wrap items-center justify-between text-xs text-[#718797]">
                            <div className="flex items-center gap-2">
                                <UserCheck className="w-4 h-4 text-[#4A9AD4]" />
                                <span>Client / Brand: <strong>{gallery.client_name || 'Featured Brand'}</strong></span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-[#4A9AD4]" /> {gallery.views_count} Views</span>
                                <span>{gallery.bookmarks_count} Saves</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Viewer Carousel */}
                    {activeImage && (
                        <div className="bg-white rounded-2xl border border-[#E6EEF3] shadow-sm overflow-hidden space-y-4 p-4">
                            <div className="relative h-[480px] bg-black rounded-xl overflow-hidden flex items-center justify-center">
                                <img 
                                    src={activeImage.image_url} 
                                    alt={activeImage.alt_text || gallery.title}
                                    className="w-full h-full object-contain"
                                />

                                {gallery.images.length > 1 && (
                                    <>
                                        <button 
                                            onClick={prevImage}
                                            className="absolute left-4 z-10 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={nextImage}
                                            className="absolute right-4 z-10 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Image Caption & Credit Bar */}
                            <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                                <p className="text-[#102A3D] font-semibold">
                                    {activeImage.caption || gallery.title}
                                </p>
                                {activeImage.credit_name && (
                                    <span className="text-[#718797]">Photo Credit: <strong>{activeImage.credit_name}</strong></span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Related Visual Galleries */}
                    {relatedGalleries.length > 0 && (
                        <div className="pt-8 space-y-6">
                            <h2 className="text-2xl font-bold font-outfit text-[#102A3D]">More Visual Inspiration</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedGalleries.map((rel) => (
                                    <GalleryCard
                                        key={rel.id}
                                        id={rel.id}
                                        title={rel.title}
                                        slug={rel.slug}
                                        heroImage={rel.hero_image}
                                        category={rel.category}
                                        viewsCount={rel.views_count}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </AppLayout>
    );
}
