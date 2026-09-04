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

        $query = Article::with(['category', 'author', 'tags'])
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
                    ->orWhere('subtitle', 'like', "%{$searchQuery}%")
                    ->orWhere('content', 'like', "%{$searchQuery}%");
            });
        }

        $articles = $query->orderByDesc('id')->paginate(300)->withQueryString();
        $categories = Category::withCount('articles')->get();
        $tags = Tag::withCount('articles')->orderByDesc('articles_count')->take(20)->get();
        $editorialBoards = EditorialBoard::where('is_active', true)->orderBy('sort_order')->get();

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
        $article = Article::with(['category', 'author', 'tags', 'comments'])
            ->where('slug', $slug)
            ->first();

        if (!$article) {
            $article = Article::with(['category', 'author', 'tags', 'comments'])
                ->where('id', $slug)
                ->first();
        }

        if (!$article) {
            $article = Article::with(['category', 'author', 'tags', 'comments'])
                ->where('title', 'like', "%{$slug}%")
                ->first();
        }

        if (!$article) {
            $article = Article::with(['category', 'author', 'tags', 'comments'])
                ->latest('published_at')
                ->firstOrFail();
        }

        // Increment view count
        $article->increment('view_count');

        // Related articles from same category (exclude self)
        $relatedArticles = Article::with(['category', 'author', 'tags'])
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->latest('published_at')
            ->take(3)
            ->get();

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
            'datePublished' => $article->published_at?->toIso8601String(),
            'dateModified' => $article->updated_at?->toIso8601String(),
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
