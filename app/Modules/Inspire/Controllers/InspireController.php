<?php

namespace App\Modules\Inspire\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Inspire\Models\Collection;
use App\Modules\Inspire\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InspireController extends Controller
{
    /**
     * Display the Inspire Visual Hub (Pinterest-style discovery).
     */
    public function index(Request $request): Response
    {
        $selectedCategory = $request->query('category');
        $search = $request->query('search');

        $query = Gallery::withCount('images')
            ->where('status', 'published');

        if ($selectedCategory) {
            $query->where('category', $selectedCategory);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('client_name', 'like', "%{$search}%");
            });
        }

        $galleries = $query->latest()->paginate(12)->withQueryString();
        $collections = Collection::latest()->get();

        return Inertia::render('Inspire/Index', [
            'galleries' => $galleries,
            'collections' => $collections,
            'filters' => [
                'category' => $selectedCategory,
                'search' => $search,
            ],
        ]);
    }

    /**
     * Display a specific visual inspiration gallery.
     */
    public function show(string $slug): Response
    {
        $gallery = Gallery::with(['images'])
            ->where('slug', $slug)
            ->firstOrFail();

        $gallery->increment('views_count');

        $relatedGalleries = Gallery::where('id', '!=', $gallery->id)
            ->where('category', $gallery->category)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Inspire/Show', [
            'gallery' => $gallery,
            'relatedGalleries' => $relatedGalleries,
        ]);
    }

    /**
     * Bookmark / Save a gallery.
     */
    public function bookmark(Gallery $gallery): JsonResponse
    {
        $gallery->increment('bookmarks_count');

        return response()->json([
            'success' => true,
            'bookmarks_count' => $gallery->bookmarks_count,
        ]);
    }
}
