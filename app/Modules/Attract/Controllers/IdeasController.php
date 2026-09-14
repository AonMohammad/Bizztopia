<?php

namespace App\Modules\Attract\Controllers;

use App\Core\SEO\SeoGenerator;
use App\Http\Controllers\Controller;
use App\Models\EditorialBoard;
use App\Modules\Attract\Models\Article;
use App\Modules\Attract\Models\ArticleBookmark;
use App\Modules\Attract\Models\ArticleComment;
use App\Modules\Attract\Models\Category;
use App\Modules\Attract\Models\Tag;
use App\Modules\Attract\Services\RssIngestionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Cache;

class IdeasController extends Controller
{
    /**
     * Display the Ideas / Knowledge Hub portal.
     */
    public function index(Request $request): Response
    {
        $selectedCategory = $request->query('category');
        $selectedType = $request->query('type');
        $searchQuery = $request->query('search');

        $query = Article::select([
                'id', 'category_id', 'author_id', 'title', 'slug', 'subtitle', 
                'hero_image', 'content_type', 'reading_time', 'view_count', 
                'published_at', 'status', 'region'
            ])
            ->with(['category:id,name,slug,color', 'author:id,name,role_title,avatar_url', 'tags:id,name,slug'])
            ->where('status', 'published')
            ->where('region', 'North America');

        if ($selectedCategory) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $selectedCategory));
        }

        if ($selectedType) {
            $query->where('content_type', $selectedType);
        }

        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('title', 'like', "%{$searchQuery}%")
                    ->orWhere('subtitle', 'like', "%{$searchQuery}%");
            });
        }

        $articles = $query->orderByDesc('published_at')->orderByDesc('id')->paginate(36)->withQueryString();
        
        $categories = Cache::remember('bizztopia_ideas_categories_v2', 3600, function () {
            return Category::withCount('articles')->get(['id', 'name', 'slug', 'color', 'image_url']);
        });

        $tags = Cache::remember('bizztopia_ideas_tags_v2', 3600, function () {
            return Tag::withCount('articles')->orderByDesc('articles_count')->take(20)->get(['id', 'name', 'slug']);
        });

        $editorialBoards = Cache::remember('bizztopia_editorial_boards_v2', 3600, function () {
            return EditorialBoard::where('is_active', true)->orderBy('sort_order')->get();
        });

        return Inertia::render('Ideas/Index', [
            'articles' => $articles,
            'categories' => $categories,
            'tags' => $tags,
            'editorialBoards' => $editorialBoards,
            'filters' => [
                'category' => $selectedCategory,
                'type' => $selectedType,
                'search' => $searchQuery,
            ],
            'region' => 'North America',
        ]);
    }

    /**
     * Display a specific Article page.
     */
    public function show(Request $request, string $slug): Response
    {
        $article = Cache::remember("bizztopia_article_show_{$slug}_v2", 1800, function () use ($slug) {
            $art = Article::with(['category', 'author', 'tags', 'comments'])
                ->where('slug', $slug)
                ->first();

            if (!$art) {
                $art = Article::with(['category', 'author', 'tags', 'comments'])
                    ->where('id', $slug)
                    ->first();
            }

            if (!$art) {
                $art = Article::with(['category', 'author', 'tags', 'comments'])
                    ->where('title', 'like', "%{$slug}%")
                    ->first();
            }

            return $art;
        });

        if (!$article) {
            $article = Article::with(['category', 'author', 'tags', 'comments'])
                ->latest('published_at')
                ->firstOrFail();
        }

        // Increment view count quietly in background
        Article::where('id', $article->id)->increment('view_count');

        // Related articles from same category (exclude self)
        $relatedArticles = Cache::remember("bizztopia_related_{$article->category_id}_{$article->id}_v2", 3600, function () use ($article) {
            return Article::select(['id', 'category_id', 'author_id', 'title', 'slug', 'subtitle', 'hero_image', 'reading_time', 'published_at'])
                ->with(['category:id,name,slug,color', 'author:id,name,role_title'])
                ->where('category_id', $article->category_id)
                ->where('id', '!=', $article->id)
                ->latest('published_at')
                ->take(3)
                ->get();
        });

        // Check if visitor has bookmarked this article
        $sessionId = $request->session()->getId();
        $isBookmarked = ArticleBookmark::where('article_id', $article->id)
            ->where('session_id', $sessionId)
            ->exists();

        // Build JSON-LD Schema.org structured data
        $jsonLdSchema = [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $article->title,
            'description' => $article->subtitle ?? '',
            'image' => $article->hero_image ?? '',
            'author' => [
                '@type' => 'Person',
                'name' => $article->author?->name ?? 'Editorial Team',
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => 'Bizztopia',
                'logo' => ['@type' => 'ImageObject', 'url' => '/logo.svg'],
            ],
            'datePublished' => $article->published_at ? date('c', strtotime((string)$article->published_at)) : null,
            'dateModified' => $article->updated_at ? date('c', strtotime((string)$article->updated_at)) : null,
        ];

        return Inertia::render('Ideas/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
            'isBookmarked' => $isBookmarked,
            'jsonLdSchema' => $jsonLdSchema,
        ]);
    }

    /**
     * Display a specific Category page.
     */
    public function category(Request $request, string $slug): Response
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        $articles = Article::with(['category', 'author'])
            ->where('category_id', $category->id)
            ->where('status', 'published')
            ->latest('published_at')
            ->get();

        return Inertia::render('Ideas/Category', [
            'category' => $category,
            'articles' => $articles,
        ]);
    }


    /**
     * Submit a comment on an article.
     */
    public function storeComment(Request $request, int $articleId): RedirectResponse
    {
        $request->validate([
            'author_name' => 'required|string|max:100',
            'author_email' => 'required|email|max:150',
            'author_company' => 'nullable|string|max:150',
            'body' => 'required|string|min:10|max:2000',
        ]);

        ArticleComment::create([
            'article_id' => $articleId,
            'author_name' => $request->author_name,
            'author_email' => $request->author_email,
            'author_company' => $request->author_company,
            'body' => $request->body,
            'status' => 'approved',
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Your comment has been posted!');
    }

    /**
     * Toggle bookmark on an article (session-based).
     */
    public function toggleBookmark(Request $request, int $articleId): JsonResponse
    {
        $sessionId = $request->session()->getId();

        $existing = ArticleBookmark::where('article_id', $articleId)
            ->where('session_id', $sessionId)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['bookmarked' => false]);
        }

        ArticleBookmark::create([
            'article_id' => $articleId,
            'session_id' => $sessionId,
            'ip_address' => $request->ip(),
        ]);

        return response()->json(['bookmarked' => true]);
    }

    /**
     * Trigger manual RSS Sync.
     */
    public function syncRss(RssIngestionService $rssService): RedirectResponse
    {
        $count = $rssService->syncFeeds();
        return back()->with('success', "Successfully synced {$count} RSS feeds!");
    }
}
