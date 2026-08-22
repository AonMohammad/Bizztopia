<?php

namespace Database\Seeders;

use App\Models\EditorialBoard;
use Illuminate\Database\Seeder;

class EditorialBoardSeeder extends Seeder
{
    public function run(): void
    {
        $boards = [
            [
                'name' => 'Market News & Industry Bulletins',
                'slug' => 'market-news-industry-bulletins',
                'layout_type' => 'hero_split',
                'category_filter' => 'News',
                'ad_type' => 'google_ads',
                'ad_code' => '<!-- Google AdSense Leaderboard Banner (728x90) -->\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-bizztopia-7890" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Business & Growth Blogs',
                'slug' => 'business-growth-blogs',
                'layout_type' => '4_column_masonry',
                'category_filter' => 'Blog',
                'ad_type' => 'engage_poll',
                'ad_code' => null,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Industry Guides & Benchmarks',
                'slug' => 'industry-guides-benchmarks',
                'layout_type' => 'spotlight_digest',
                'category_filter' => 'Industry Guide',
                'ad_type' => 'google_ads',
                'ad_code' => '<!-- Google AdSense Native In-Feed Banner -->\n<ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-fb+5w+4e-db+86" data-ad-client="ca-pub-bizztopia-7890" data-ad-slot="9876543210"></ins>',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Tactical Tips & Growth Frameworks',
                'slug' => 'tactical-tips-growth-frameworks',
                'layout_type' => 'market_grid',
                'category_filter' => 'Tips & Tricks',
                'ad_type' => 'engage_quiz',
                'ad_code' => null,
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($boards as $board) {
            EditorialBoard::updateOrCreate(
                ['slug' => $board['slug']],
                $board
            );
        }
    }
}
