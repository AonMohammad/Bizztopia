<?php

namespace App\Modules\Attract\Services;

use App\Modules\Attract\Models\Article;
use App\Modules\Attract\Models\Author;
use App\Modules\Attract\Models\Category;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RssIngestionService
{
    /**
     * Maximum articles allowed per website/RSS feed source.
     */
    public const MAX_ARTICLES_PER_WEBSITE = 50;

    /**
     * Absolute maximum total articles that can be ingested overall per calendar day.
     */
    public const MAX_DAILY_ARTICLES = 50;

    /**
     * Category subcategory mapping.
     */
    protected array $categoriesWithSubcategories = [
        'restaurants' => [
            'takeout', 'delivery', 'hot-trendy', 'new-restaurants', 'breakfast-brunch',
            'lunch', 'dinner', 'coffee-cafes', 'pizza', 'chinese', 'mexican',
            'bakeries', 'italian', 'food-trucks', 'sports-bars-pubs'
        ],
        'home-garden' => [
            'contractors-handymen', 'plumbers', 'electricians', 'hvac', 'appliances-repair',
            'roofing', 'locksmiths', 'painters', 'landscaping', 'nurseries-gardening',
            'florists', 'tree-services', 'home-cleaning', 'furniture-stores', 'movers'
        ],
        'auto-services' => [
            'auto-repair', 'body-shops', 'oil-change', 'tires', 'towing',
            'car-wash', 'auto-detailing', 'parking', 'car-dealers', 'junkyards'
        ],
        'health-beauty' => [
            'dentists', 'doctors', 'chiropractors', 'optometrists', 'dermatologists',
            'podiatrists', 'massage', 'hair-salons', 'nail-salons', 'barbers',
            'spas', 'physical-therapy'
        ],
        'travel-activities' => [
            'things-to-do', 'kids-activities-camps', 'venues-events', 'churches', 'shopping-malls',
            'bookstores', 'mini-golf', 'bowling', 'hotels', 'taxis', 'bike-rentals',
            'campgrounds', 'beaches', 'swimming-pools', 'bars-nightlife'
        ],
        'more' => [
            'dry-cleaning', 'laundromats', 'thrift-stores', 'tailors-alterations', 'apartments',
            'junk-removal', 'gyms', 'yoga-pilates'
        ]
    ];

    /**
     * Curated pools of 50 Unsplash image IDs per category as secondary fallback.
     */
    protected array $imagePools = [
        'restaurants' => ['1517248135467-4c7edcad34c4', '1552566626-52f8b828add9', '1414235077428-338989a2e8c0', '1555396273-367ea4eb4db5'],
        'home-garden' => ['1581094288338-2314dddb7ecc', '1504307651254-35680f356dfd', '1505797149-43b0069ec26b', '1513694203232-719a280e022f'],
        'auto-services' => ['1486006920555-c77dce18193b', '1517524206127-48bbd363f3d7', '1520340356584-f9917d1ecc6f'],
        'health-beauty' => ['1506126613408-eca07ce68773', '1576091160550-2173dba999ef', '1527613426441-4da17471b66d'],
        'travel-activities' => ['1511632765486-a01980e01a18', '1488646953014-85cb44e25828', '1507525428034-b723cf961d3e'],
        'more' => ['1521566624976-7357306c5458', '1560518883-ce09059eeffa', '1517838277536-f5f99be501cd']
    ];

    protected ArticleRewriterService $rewriter;
    protected ?array $pexelsData = null;

    public function __construct(?ArticleRewriterService $rewriter = null)
    {
        $this->rewriter = $rewriter ?? new ArticleRewriterService();
        $this->loadPexelsData();
    }

    /**
     * Load subcategory Pexels photos from JSON catalog.
     */
    protected function loadPexelsData(): void
    {
        $jsonPath = resource_path('js/data/subcategory_images.json');
        if (File::exists($jsonPath)) {
            $json = File::get($jsonPath);
            $this->pexelsData = json_decode($json, true);
        }
    }

    /**
     * Get list of all configured RSS feeds.
     */
    public function getConfiguredFeeds(): array
    {
        $feeds = [];
        foreach ($this->categoriesWithSubcategories as $cat => $subs) {
            foreach ($subs as $sub) {
                $subNameSpaced = str_replace('-', '+', $sub);
                $feeds["Google News - " . ucwords(str_replace('-', ' ', $sub)) . " (Business)"] = "https://news.google.com/rss/search?q=" . $subNameSpaced . "+business&hl=en-US&gl=US&ceid=US:en";
                $feeds["Google News - " . ucwords(str_replace('-', ' ', $sub)) . " (Trends)"] = "https://news.google.com/rss/search?q=" . $subNameSpaced . "+trends&hl=en-US&gl=US&ceid=US:en";
            }
        }
        return $feeds;
    }

    /**
     * Determine content type sub-tab from article title/content.
     */
    protected function determineContentType(string $title, string $content): string
    {
        $titleLower = strtolower($title);

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
     * Clean text of HTML tags, HTML entities, raw URLs, and Google News artifacts.
     */
    protected function sanitizeCleanText(string $text): string
    {
        if (empty($text)) return '';
        $decoded = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $clean = preg_replace('/<a\b[^>]*>(.*?)<\/a>/is', '$1', $decoded);
        $clean = preg_replace('/<a\b[^>]*|href\s*=\s*"[^"]*"|href\s*=\s*\'[^\']*\'/i', '', $clean);
        $clean = preg_replace('/https?:\/\/news\.google\.com[^\s<>\'"]+/i', '', $clean);
        $clean = preg_replace('/<font[^>]*>(.*?)<\/font>/is', '$1', $clean);
        $clean = preg_replace('/\(Part\s*\d+\)/i', '', $clean);
        $clean = strip_tags($clean);
        return trim(preg_replace('/\s+/', ' ', $clean));
    }

    /**
     * Get a UNIQUE HD photo matching subcategory from Pexels catalog or fallback.
     */
    protected function getArticleImage(string $catSlug, string $subSlug): string
    {
        $existingImages = Article::pluck('hero_image')->filter()->toArray();

        if (!empty($this->pexelsData) && isset($this->pexelsData[$subSlug]) && !empty($this->pexelsData[$subSlug])) {
            $photos = $this->pexelsData[$subSlug];
            foreach ($photos as $p) {
                $url = is_array($p) ? ($p['url'] ?? '') : $p;
                if (!empty($url) && !in_array($url, $existingImages)) {
                    return $url;
                }
            }
            // Fallback to random if all subcategory photos used
            $selected = $photos[array_rand($photos)];
            $url = is_array($selected) ? ($selected['url'] ?? '') : $selected;
            if (!empty($url)) return $url;
        }

        $pool = $this->imagePools[$catSlug] ?? $this->imagePools['more'];
        $idx = array_rand($pool);
        $imageId = $pool[$idx];
        return "https://images.unsplash.com/photo-" . $imageId . "?w=800&q=80&auto=format&fit=crop";
    }

    /**
     * Ingest and rewrite articles strictly capped at 50 total articles per day.
     */
    public function syncFeeds(): int
    {
        // Strict global check: Max 50 articles per day across the entire platform
        $todayTotalCount = Article::whereDate('created_at', today())->count();
        if ($todayTotalCount >= self::MAX_DAILY_ARTICLES) {
            Log::info("RSS sync halted: Daily cap of " . self::MAX_DAILY_ARTICLES . " articles already reached for today ({$todayTotalCount} created).");
            return 0;
        }

        $maxAllowedNew = self::MAX_DAILY_ARTICLES - $todayTotalCount;
        $importedCount = 0;

        $defaultAuthor = Author::firstOrCreate(
            ['slug' => 'north-american-editorial-team'],
            [
                'name' => 'North American Business Desk',
                'role_title' => 'Editorial & Market Insights Analyst',
                'bio' => 'Verified North American business intelligence and curation desk for Bizztopia.',
                'region' => 'North America',
            ]
        );

        $categories = Category::all();

        foreach ($categories as $category) {
            if ($importedCount >= $maxAllowedNew) {
                Log::info("RSS sync: Global daily cap of " . self::MAX_DAILY_ARTICLES . " articles reached.");
                break;
            }

            $catId = $category->id;
            $catSlug = $category->slug;

            // Find subcategories for this category
            $subcategories = $this->categoriesWithSubcategories[$catSlug] ?? [];
            if (empty($subcategories)) {
                continue;
            }

            // Iterate through subcategories
            foreach ($subcategories as $subSlug) {
                if ($importedCount >= $maxAllowedNew) {
                    break 2;
                }

                $sourceName = "Google News - " . ucwords(str_replace('-', ' ', $subSlug));
                $websiteArticleCount = Article::where('source_rss_name', $sourceName)->count();

                if ($websiteArticleCount >= self::MAX_ARTICLES_PER_WEBSITE) {
                    Log::info("RSS sync: Skipping '{$sourceName}' — max website limit of " . self::MAX_ARTICLES_PER_WEBSITE . " articles reached.");
                    continue;
                }

                $subNameSpaced = str_replace('-', '+', $subSlug);
                $feeds = [
                    "https://news.google.com/rss/search?q=" . $subNameSpaced . "+business&hl=en-US&gl=US&ceid=US:en",
                    "https://news.google.com/rss/search?q=" . $subNameSpaced . "+trends&hl=en-US&gl=US&ceid=US:en"
                ];

                foreach ($feeds as $feedUrl) {
                    if ($importedCount >= $maxAllowedNew) {
                        break 3;
                    }

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
                            if ($importedCount >= $maxAllowedNew) {
                                break 4;
                            }

                            $title = (string) $item->title;
                            if (empty($title)) {
                                continue;
                            }

                            // Clean title and remove trailing source (e.g. " - TechCrunch")
                            $titleClean = trim(preg_replace('/ - [^-]+$/', '', $title));
                            $titleClean = $this->sanitizeCleanText($titleClean);

                            $slug = Str::slug($titleClean);
                            if (empty($slug) || Article::where('slug', $slug)->exists()) {
                                continue;
                            }

                            $rawContent = (string) ($item->description ?? '');
                            $rawContentClean = $this->sanitizeCleanText($rawContent);
                            $link = (string) $item->link;
                            $pubDate = now();

                            // Run through Article Rewriter Pipeline
                            $rewritten = $this->rewriter->rewrite(
                                $titleClean,
                                $rawContentClean,
                                $category->name,
                                $subSlug
                            );

                            $cleanSubtitle = $this->sanitizeCleanText($rewritten['subtitle']);
                            $contentType = $this->determineContentType($titleClean, $rewritten['content']);
                            $heroImage = $this->getArticleImage($catSlug, $subSlug);

                            Article::create([
                                'title' => $this->sanitizeCleanText($rewritten['title'] ?? $titleClean),
                                'slug' => $slug,
                                'subtitle' => $cleanSubtitle,
                                'content' => $rewritten['content'],
                                'category_id' => $catId,
                                'author_id' => $defaultAuthor->id,
                                'content_type' => $contentType,
                                'region' => 'North America',
                                'reading_time' => $rewritten['reading_time'],
                                'source_rss_name' => "Google News - " . ucwords(str_replace('-', ' ', $subSlug)),
                                'canonical_url' => $link,
                                'hero_image' => $heroImage,
                                'status' => 'published',
                                'seo_title' => $titleClean . " — Bizztopia Ideas",
                                'seo_description' => Str::limit(strip_tags($cleanSubtitle), 160),
                                'published_at' => $pubDate,
                            ]);

                            $importedCount++;
                        }
                    } catch (\Throwable $e) {
                        Log::warning("RSS ingestion failed for " . $subSlug . ": " . $e->getMessage());
                    }
                }
            }
        }

        Log::info("RSS sync complete: " . $importedCount . " new rewritten articles ingested today. Daily total: " . ($todayTotalCount + $importedCount) . " / " . self::MAX_DAILY_ARTICLES);
        return $importedCount;
    }
}
