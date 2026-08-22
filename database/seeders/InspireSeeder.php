<?php

namespace Database\Seeders;

use App\Modules\Inspire\Models\Collection;
use App\Modules\Inspire\Models\Gallery;
use App\Modules\Inspire\Models\GalleryImage;
use Illuminate\Database\Seeder;

class InspireSeeder extends Seeder
{
    public function run(): void
    {
        // Gallery 1: Executive Office
        $g1 = Gallery::create([
            'title' => 'Modern Executive Tech Workspace & Innovation Studio',
            'slug' => 'modern-executive-tech-workspace-innovation-studio',
            'description' => 'A visual tour of next-generation North American corporate office design focusing on collaborative spaces and glass architectural acoustics.',
            'category' => 'Workspaces',
            'hero_image' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
            'client_name' => 'Vanguard Financial Systems',
            'location' => 'Toronto, ON & Chicago, IL',
            'views_count' => 1240,
            'bookmarks_count' => 84,
            'status' => 'published',
        ]);

        GalleryImage::create([
            'gallery_id' => $g1->id,
            'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
            'caption' => 'Open floor collaborative hub featuring natural light acoustics.',
            'alt_text' => 'Modern Executive Office Hub',
            'credit_name' => 'Apex Architectural Photography',
            'sort_order' => 1,
        ]);

        GalleryImage::create([
            'gallery_id' => $g1->id,
            'image_url' => 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
            'caption' => 'Private executive conference room with integrated smart presentation displays.',
            'alt_text' => 'Executive Conference Room',
            'credit_name' => 'Apex Architectural Photography',
            'sort_order' => 2,
        ]);

        // Gallery 2: Retail Storefront
        $g2 = Gallery::create([
            'title' => 'Minimalist Retail Concept Storefront & Customer Journey',
            'slug' => 'minimalist-retail-concept-storefront-customer-journey',
            'description' => 'Architectural design case study showing how clean lighting and intuitive layout boost foot-traffic conversions.',
            'category' => 'Retail',
            'hero_image' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
            'client_name' => 'Aura Lifestyle Group',
            'location' => 'Vancouver, BC & New York, NY',
            'views_count' => 890,
            'bookmarks_count' => 52,
            'status' => 'published',
        ]);

        GalleryImage::create([
            'gallery_id' => $g2->id,
            'image_url' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
            'caption' => 'Minimalist storefront entry designed for maximum street visibility.',
            'alt_text' => 'Retail Concept Storefront',
            'credit_name' => 'Studio Metro',
            'sort_order' => 1,
        ]);

        // Gallery 3: Digital Brand Identity
        $g3 = Gallery::create([
            'title' => 'Digital CAP Platform Design & Brand Identity Suite',
            'slug' => 'digital-cap-platform-design-brand-identity-suite',
            'description' => 'Aspirational visual showcase of tokenized UI design systems, dark modes, and dynamic brand palettes.',
            'category' => 'Branding',
            'hero_image' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
            'client_name' => 'Techception Core',
            'location' => 'San Francisco, CA',
            'views_count' => 1560,
            'bookmarks_count' => 112,
            'status' => 'published',
        ]);

        // Collections
        Collection::create([
            'title' => '2026 Executive Office Playbook',
            'slug' => '2026-executive-office-playbook',
            'description' => 'Curated visual design inspiration for modern North American corporate spaces.',
            'cover_image' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        ]);

        Collection::create([
            'title' => 'High-Converting Retail Layouts',
            'slug' => 'high-converting-retail-layouts',
            'description' => 'Visual store layouts optimized for foot traffic and customer engagement.',
            'cover_image' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        ]);
    }
}
