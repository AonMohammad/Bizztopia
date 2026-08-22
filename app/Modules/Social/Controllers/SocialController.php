<?php

namespace App\Modules\Social\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Social\Models\Answer;
use App\Modules\Social\Models\Question;
use App\Modules\Social\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SocialController extends Controller
{
    /**
     * Display the Social Module Hub (Community Discussions & Verified Reviews).
     */
    public function index(Request $request): Response
    {
        $selectedCategory = $request->query('category');
        $search = $request->query('search');

        $query = Question::withCount('answers')
            ->where('status', 'published');

        if ($selectedCategory) {
            $query->where('category', $selectedCategory);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('body', 'like', "%{$search}%");
            });
        }

        $questions = $query->latest()->paginate(10)->withQueryString();
        $reviews = Review::where('status', 'approved')->latest()->take(6)->get();

        return Inertia::render('Social/Index', [
            'questions' => $questions,
            'reviews' => $reviews,
            'filters' => [
                'category' => $selectedCategory,
                'search' => $search,
            ],
        ]);
    }

    /**
     * Display a specific community discussion thread.
     */
    public function show(string $slug): Response
    {
        $question = Question::with(['answers'])
            ->where('slug', $slug)
            ->firstOrFail();

        $relatedQuestions = Question::where('id', '!=', $question->id)
            ->where('category', $question->category)
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('Social/Show', [
            'question' => $question,
            'relatedQuestions' => $relatedQuestions,
        ]);
    }

    /**
     * Submit a new community question.
     */
    public function storeQuestion(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'min:10'],
            'category' => ['required', 'string'],
            'author_name' => ['required', 'string', 'max:100'],
            'author_role' => ['nullable', 'string', 'max:100'],
        ]);

        $slug = Str::slug($validated['title']) . '-' . Str::random(5);

        Question::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'slug' => $slug,
            'body' => $validated['body'],
            'category' => $validated['category'],
            'author_name' => $validated['author_name'],
            'author_role' => $validated['author_role'] ?? 'Community Member',
            'status' => 'published',
        ]);

        return back()->with('success', 'Question posted to community successfully!');
    }

    /**
     * Post an answer to a question.
     */
    public function storeAnswer(Request $request, Question $question): RedirectResponse
    {
        $validated = $request->validate([
            'body' => ['required', 'string', 'min:5'],
            'author_name' => ['required', 'string', 'max:100'],
            'author_role' => ['nullable', 'string', 'max:100'],
        ]);

        Answer::create([
            'question_id' => $question->id,
            'user_id' => auth()->id(),
            'author_name' => $validated['author_name'],
            'author_role' => $validated['author_role'] ?? 'Community Contributor',
            'body' => $validated['body'],
        ]);

        $question->increment('answers_count');

        return back()->with('success', 'Answer posted successfully!');
    }

    /**
     * Upvote a question.
     */
    public function upvoteQuestion(Question $question): JsonResponse
    {
        $question->increment('upvotes_count');

        return response()->json([
            'success' => true,
            'upvotes_count' => $question->upvotes_count,
        ]);
    }

    /**
     * Submit a verified customer review.
     */
    public function storeReview(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'reviewer_name' => ['required', 'string', 'max:100'],
            'business_name' => ['required', 'string', 'max:150'],
            'service_category' => ['required', 'string'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'title' => ['required', 'string', 'max:200'],
            'review_body' => ['required', 'string', 'min:10'],
        ]);

        Review::create([
            'user_id' => auth()->id(),
            'reviewer_name' => $validated['reviewer_name'],
            'business_name' => $validated['business_name'],
            'service_category' => $validated['service_category'],
            'rating' => $validated['rating'],
            'title' => $validated['title'],
            'review_body' => $validated['review_body'],
            'is_verified' => true,
            'status' => 'approved',
        ]);

        return back()->with('success', 'Review submitted successfully!');
    }
}
