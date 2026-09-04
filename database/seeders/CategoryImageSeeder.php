<?php

namespace Database\Seeders;

use App\Modules\Attract\Models\Category;
use Illuminate\Database\Seeder;

class CategoryImageSeeder extends Seeder
{
    public function run(): void
    {
        // Curated Unsplash images per category slug — B2B / business themed
        $categoryImages = [
            // Marketing & Acquisition — campaign, advertising, analytics
            'marketing-acquisition' => 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=800&auto=format&fit=crop',

            // Legal & Compliance — courtroom, scales, documents
            'legal-compliance' => 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',

            // Finance & ROI — charts, money, trading floor
            'finance-roi' => 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',

            // Finance & Valuation — stock ticker, data
            'finance-calculators' => 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop',

            // Technology & AEO — AI, laptop, code
            'technology-aeo' => 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&auto=format&fit=crop',

            // Business Ideas & Strategy — brainstorm, whiteboard, team
            'ideas-insights' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',

            // SaaS / Software — dashboard, product screen
            'saas-platforms' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',

            // Consulting — professional meeting, handshake
            'consulting' => 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',

            // HR & Talent — hiring, team, office people
            'hr-talent' => 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop',

            // E-commerce & Retail — online shopping, delivery
            'ecommerce' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',

            // Growth & Scaling — rocket launch, growth chart
            'growth-scaling' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',

            // Branding & Design — design tools, creative workspace
            'branding-design' => 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop',
        ];

        // Fallback images for any category without a specific mapping
        $fallbackImages = [
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=800&auto=format&fit=crop',
        ];

        $i = 0;
        foreach (Category::all() as $category) {
            $imageUrl = $categoryImages[$category->slug]
                ?? $fallbackImages[$i % count($fallbackImages)];

            $category->update(['image_url' => $imageUrl]);
            $i++;
        }

        $this->command->info('✅ Category images seeded successfully for ' . Category::count() . ' categories.');
    }
}
