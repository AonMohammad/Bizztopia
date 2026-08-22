import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { GalleryCard } from '@/components/ui/GalleryCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Sparkles, Search, Compass, Layers } from 'lucide-react';

interface GalleryItem {
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
    images_count: number;
}

interface CollectionItem {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string;
}

interface InspireIndexProps {
    galleries: {
        data: GalleryItem[];
        links: any[];
    };
    collections: CollectionItem[];
    filters: {
        category?: string;
        search?: string;
    };
}

export default function Index({ galleries, collections, filters }: InspireIndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/inspire', { ...filters, search }, { preserveState: true });
    };

    const handleCategoryFilter = (category?: string) => {
        router.get('/inspire', { ...filters, category: category || '' }, { preserveState: true });
    };

    return (
        <AppLayout>
            <Head title="Inspire — Visual Discovery & Design Galleries" />

            {/* Inspire Hero Header */}
            <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-hero text-white border-b border-[#0B4778]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A9AD4]/20 border border-[#8FC7E8]/40 text-[#63B5E8] text-xs font-semibold uppercase tracking-wider">
                        <Compass className="w-3.5 h-3.5 text-[#63B5E8]" />
                        <span>Module 05 — Inspire • Visual Discovery Layer</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit text-white tracking-tight">
                        Visual Design & Architecture Discovery<span className="text-[#4A9AD4]">.</span>
                    </h1>

                    <p className="text-[#D5EBF8] text-base max-w-2xl leading-relaxed">
                        Explore Pinterest-style executive workspace designs, retail storefront concepts, and digital brand identity showcases across North America.
                    </p>

                    {/* Search & Category Pills */}
                    <form onSubmit={handleSearch} className="pt-2 max-w-lg flex items-center gap-2">
                        <Input
                            placeholder="Search workspace designs, retail layouts, branding..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            icon={<Search className="w-4 h-4 text-[#718797]" />}
                        />
                        <Button type="submit" variant="primary">Search</Button>
                    </form>
                </div>
            </section>

            {/* Category Filter Pills Bar */}
            <section className="py-6 bg-white border-b border-[#E6EEF3]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-[#718797] font-bold uppercase tracking-wider mr-2">Categories:</span>
                    {['', 'Workspaces', 'Retail', 'Branding'].map((cat) => (
                        <button
                            key={cat || 'all'}
                            onClick={() => handleCategoryFilter(cat)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                (filters.category === cat || (!filters.category && !cat))
                                    ? 'bg-[#0B4778] text-white shadow-xs'
                                    : 'bg-[#F7FAFC] text-[#466071] hover:bg-[#EEF4F8] hover:text-[#102A3D]'
                            }`}
                        >
                            {cat || 'All Visuals'}
                        </button>
                    ))}
                </div>
            </section>

            {/* Main Visual Galleries Grid */}
            <section className="py-16 bg-[#F7FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {/* Visual Galleries Grid */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold font-outfit text-[#102A3D]">Trending Design Showcases</h2>
                            <span className="text-xs text-[#718797] font-semibold">{galleries.data.length} Visual Galleries</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {galleries.data.map((gal) => (
                                <GalleryCard
                                    key={gal.id}
                                    id={gal.id}
                                    title={gal.title}
                                    slug={gal.slug}
                                    heroImage={gal.hero_image}
                                    category={gal.category}
                                    clientName={gal.client_name}
                                    location={gal.location}
                                    viewsCount={gal.views_count}
                                    bookmarksCount={gal.bookmarks_count}
                                    imagesCount={gal.images_count}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Curated Collections Section */}
                    {collections.length > 0 && (
                        <div className="space-y-6 pt-6">
                            <div className="flex items-center gap-2">
                                <Layers className="w-5 h-5 text-[#4A9AD4]" />
                                <h2 className="text-2xl font-bold font-outfit text-[#102A3D]">Curated Visual Collections</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {collections.map((col) => (
                                    <div 
                                        key={col.id}
                                        className="relative rounded-2xl overflow-hidden h-48 group shadow-xs hover:shadow-md transition-all duration-300"
                                    >
                                        <img 
                                            src={col.cover_image} 
                                            alt={col.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#062F52]/90 via-[#062F52]/40 to-transparent p-6 flex flex-col justify-end text-white">
                                            <h3 className="text-xl font-bold font-outfit text-white">{col.title}</h3>
                                            <p className="text-xs text-[#D5EBF8] line-clamp-1">{col.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
