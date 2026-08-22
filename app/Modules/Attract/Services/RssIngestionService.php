<?php

namespace App\Modules\Attract\Services;

use App\Modules\Attract\Models\Article;
use App\Modules\Attract\Models\Author;
use App\Modules\Attract\Models\Category;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RssIngestionService
{
    /**
     * Verified North American business RSS feed sources.
     *
     * @var array<string, string>
     */
    protected array $verifiedFeeds = [
        'Entrepreneur US' => 'https://www.entrepreneur.com/latest.rss',
        'Small Business Trends NA' => 'https://smallbiztrends.com/feed',
        'U.S. Small Business Administration (SBA)' => 'https://www.sba.gov/blog/feed',
        'Forbes Small Business' => 'https://www.forbes.com/small-business/feed/',
        'Inc. Magazine' => 'https://www.inc.com/rss/',
        'Harvard Business Review' => 'https://hbr.org/rss/topic/strategy',
        'TechCrunch Startups' => 'https://techcrunch.com/category/startups/feed/',
        'Wall Street Journal Business' => 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',
    ];

    /**
     * Get list of all configured RSS feeds.
     */
    public function getConfiguredFeeds(): array
    {
        return $this->verifiedFeeds;
    }

    /**
     * Determine content type sub-tab from article title/content.
     */
    protected function determineContentType(string $title, string $content): string
    {
        $titleLower = strtolower($title);
        $contentLower = strtolower($content);

        if (Str::contains($titleLower, ['how to', 'how-to', 'step by step', 'guide to'])) {
            return 'How-To';
        }
        if (Str::contains($titleLower, ['checklist', 'list', 'steps', 'template'])) {
            return 'Checklist';
        }
        if (Str::contains($titleLower, ['tips', 'tricks', 'hacks', 'secrets', 'ways to'])) {
            return 'Tips & Tricks';
        }
        if (Str::contains($titleLower, ['industry', 'market', 'report', 'benchmark', 'analysis'])) {
            return 'Industry Guide';
        }
        if (Str::contains($titleLower, ['playbook', 'handbook', 'framework', 'guide'])) {
            return 'Guide';
        }

        return 'Blog';
    }

    /**
     * Ingest articles from verified North American RSS feeds.
     *
     * @return int Count of newly ingested ideas/articles.
     */
    public function syncFeeds(): int
    {
        $importedCount = 0;
        $defaultAuthor = Author::firstOrCreate(
            ['slug' => 'north-american-editorial-team'],
            [
                'name' => 'North American Business Desk',
                'role_title' => 'Editorial & Market Insights Analyst',
                'bio' => 'Verified North American business intelligence and market trends curation desk for Bizztopia Ideas.',
                'region' => 'North America',
            ]
        );

        $defaultCategory = Category::firstOrCreate(
            ['slug' => 'ideas-insights'],
            [
                'name' => 'Business Ideas & Strategy',
                'description' => 'Proven strategies and growth ideas for North American enterprises.',
                'color' => '#6366f1',
            ]
        );

        foreach ($this->verifiedFeeds as $feedName => $feedUrl) {
            try {
                $response = Http::timeout(8)->get($feedUrl);

                if (! $response->successful()) {
                    continue;
                }

                $xml = @simplexml_load_string($response->body(), 'SimpleXMLElement', LIBXML_NOCDATA);

                if (! $xml || ! isset($xml->channel->item)) {
                    continue;
                }

                foreach ($xml->channel->item as $item) {
                    $title = (string) $item->title;
                    if (empty($title)) {
                        continue;
                    }

                    $slug = Str::slug($title);
                    if (Article::where('slug', $slug)->exists()) {
                        continue;
                    }

                    $rawContent = (string) ($item->children('content', true)->encoded ?? $item->description ?? '');
                    $cleanContent = strip_tags($rawContent, '<p><br><h2><h3><ul><li><strong><em><a>');
                    $excerpt = Str::limit(strip_tags($rawContent), 220);
                    $link = (string) $item->link;
                    $pubDate = isset($item->pubDate) ? date('Y-m-d H:i:s', strtotime((string) $item->pubDate)) : now();

                    $wordCount = str_word_count(strip_tags($cleanContent));
                    $readingTime = max(2, ceil($wordCount / 200)) . ' min read';
                    $contentType = $this->determineContentType($title, $rawContent);

                    Article::create([
                        'title' => $title,
                        'slug' => $slug,
                        'subtitle' => $excerpt,
                        'content' => ! empty($cleanContent) ? $cleanContent : "<p>{$excerpt}</p>",
                        'category_id' => $defaultCategory->id,
                        'author_id' => $defaultAuthor->id,
                        'content_type' => $contentType,
                        'region' => 'North America',
                        'reading_time' => $readingTime,
                        'source_rss_name' => $feedName,
                        'canonical_url' => $link,
                        'status' => 'published',
                        'seo_title' => "{$title} — Bizztopia Ideas (North America)",
                        'seo_description' => $excerpt,
                        'published_at' => $pubDate,
                    ]);

                    $importedCount++;
                }
            } catch (\Throwable $e) {
                Log::warning("RSS ingestion failed for {$feedName}: " . $e->getMessage());
            }
        }

        return $importedCount;
    }
}
