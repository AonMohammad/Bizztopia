<?php

namespace App\Modules\Attract\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Attract\Models\Author;
use Inertia\Inertia;
use Inertia\Response;

class AuthorController extends Controller
{
    public function show(string $slug): Response
    {
        $author = Author::where('slug', $slug)->firstOrFail();

        $articles = $author->articles()
            ->with(['category', 'tags'])
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Ideas/Author', [
            'author' => $author,
            'articles' => $articles,
        ]);
    }
}
