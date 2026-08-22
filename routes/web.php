<?php

use App\Http\Controllers\AdminController;
use App\Modules\Attract\Controllers\AuthorController;
use App\Modules\Attract\Controllers\IdeasController;
use App\Modules\Attract\Models\Article;
use App\Modules\Engage\Controllers\EngageController;
use App\Modules\Engage\Models\Poll;
use App\Modules\Engage\Models\Quiz;
use App\Modules\Inspire\Controllers\InspireController;
use App\Modules\Inspire\Models\Gallery;
use App\Modules\Social\Controllers\SocialController;
use App\Modules\Social\Models\Question;
use App\Modules\Social\Models\Review;
use App\Modules\Value\Controllers\ValueController;
use App\Modules\Value\Services\CalculationEngine;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ecosystem Master Homepage Route
Route::get('/', function (CalculationEngine $calcEngine) {
    $featuredArticle = Article::with(['category', 'author'])->latest()->first();
    $activePoll = Poll::with('options')->where('status', 'active')->latest()->first();
    $activeQuiz = Quiz::with(['questions.options', 'results'])->where('status', 'active')->latest()->first();
    $latestQuestion = Question::withCount('answers')->where('status', 'published')->latest()->first();
    $latestReview = Review::where('status', 'approved')->latest()->first();
    $featuredGallery = Gallery::where('status', 'published')->latest()->first();

    $defaultRoi = $calcEngine->calculateRoi(2500, 45, 8, 1200);

    return Inertia::render('Welcome', [
        'featuredArticle' => $featuredArticle,
        'activePoll' => $activePoll,
        'activeQuiz' => $activeQuiz,
        'latestQuestion' => $latestQuestion,
        'latestReview' => $latestReview,
        'featuredGallery' => $featuredGallery,
        'initialRoi' => $defaultRoi,
    ]);
});

// Master CAP Admin Backend Portal Full CRUD Routes
Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');

// Editorial Boards & Ad Spaces Resource
Route::get('/admin/boards', [AdminController::class, 'boards'])->name('admin.boards');
Route::post('/admin/boards', [AdminController::class, 'storeBoard'])->name('admin.boards.store');
Route::put('/admin/boards/{board}', [AdminController::class, 'updateBoard'])->name('admin.boards.update');
Route::patch('/admin/boards/{board}/toggle-status', [AdminController::class, 'toggleBoardStatus'])->name('admin.boards.toggle-status');
Route::delete('/admin/boards/{board}', [AdminController::class, 'deleteBoard'])->name('admin.boards.delete');

// Articles Resource
Route::get('/admin/articles', [AdminController::class, 'articles'])->name('admin.articles');
Route::post('/admin/articles', [AdminController::class, 'storeArticle'])->name('admin.articles.store');
Route::put('/admin/articles/{article}', [AdminController::class, 'updateArticle'])->name('admin.articles.update');
Route::patch('/admin/articles/{article}/toggle-status', [AdminController::class, 'toggleArticleStatus'])->name('admin.articles.toggle-status');
Route::patch('/admin/articles/{article}/toggle-trending', [AdminController::class, 'toggleTrending'])->name('admin.articles.toggle-trending');
Route::patch('/admin/articles/{article}/toggle-breaking', [AdminController::class, 'toggleBreaking'])->name('admin.articles.toggle-breaking');
Route::delete('/admin/articles/{article}', [AdminController::class, 'deleteArticle'])->name('admin.articles.delete');

// Polls Resource
Route::get('/admin/polls', [AdminController::class, 'polls'])->name('admin.polls');
Route::post('/admin/polls', [AdminController::class, 'storePoll'])->name('admin.polls.store');
Route::patch('/admin/polls/{poll}/toggle-status', [AdminController::class, 'togglePollStatus'])->name('admin.polls.toggle-status');
Route::delete('/admin/polls/{poll}', [AdminController::class, 'deletePoll'])->name('admin.polls.delete');

// Reviews Resource
Route::get('/admin/reviews', [AdminController::class, 'reviews'])->name('admin.reviews');
Route::post('/admin/reviews', [AdminController::class, 'storeReview'])->name('admin.reviews.store');
Route::patch('/admin/reviews/{review}/status', [AdminController::class, 'updateReviewStatus'])->name('admin.reviews.update-status');
Route::delete('/admin/reviews/{review}', [AdminController::class, 'deleteReview'])->name('admin.reviews.delete');

// Galleries Resource
Route::get('/admin/galleries', [AdminController::class, 'galleries'])->name('admin.galleries');
Route::post('/admin/galleries', [AdminController::class, 'storeGallery'])->name('admin.galleries.store');
Route::patch('/admin/galleries/{gallery}/toggle-status', [AdminController::class, 'toggleGalleryStatus'])->name('admin.galleries.toggle-status');
Route::delete('/admin/galleries/{gallery}', [AdminController::class, 'deleteGallery'])->name('admin.galleries.delete');

// Settings Resource
Route::get('/admin/settings', [AdminController::class, 'settings'])->name('admin.settings');

// Module 01 — Ideas (Attract Knowledge Hub) Routes
Route::get('/ideas', [IdeasController::class, 'index'])->name('ideas.index');
Route::get('/ideas/{slug}', [IdeasController::class, 'show'])->name('ideas.show');
Route::post('/ideas/{id}/comments', [IdeasController::class, 'storeComment'])->name('ideas.comments.store');
Route::post('/ideas/{id}/bookmark', [IdeasController::class, 'toggleBookmark'])->name('ideas.bookmark.toggle');
Route::post('/ideas/sync-rss', [IdeasController::class, 'syncRss'])->name('ideas.sync-rss');
Route::get('/authors/{slug}', [AuthorController::class, 'show'])->name('authors.show');

// Module 02 — Engage (Interactive Engine) Routes
Route::get('/engage', [EngageController::class, 'index'])->name('engage.index');
Route::post('/engage/giveaways/{giveaway}/enter', [EngageController::class, 'enterGiveaway'])->name('engage.giveaways.enter');
Route::post('/engage/polls/{poll}/vote', [EngageController::class, 'vote'])->name('engage.polls.vote');
Route::post('/engage/quizzes/{quiz}/submit', [EngageController::class, 'submitQuiz'])->name('engage.quizzes.submit');

// Module 03 — Value (Decision Tools & Calculators) Routes
Route::get('/value', [ValueController::class, 'index'])->name('value.index');
Route::post('/value/calculate-roi', [ValueController::class, 'calculateRoi'])->name('value.calculate-roi');
Route::post('/value/calculate-startup-cost', [ValueController::class, 'calculateStartupCost'])->name('value.calculate-startup-cost');

// Module 04 — Social (Community & Reputation Engine) Routes
Route::get('/social', [SocialController::class, 'index'])->name('social.index');
Route::get('/social/questions/{slug}', [SocialController::class, 'show'])->name('social.questions.show');
Route::post('/social/questions', [SocialController::class, 'storeQuestion'])->name('social.questions.store');
Route::post('/social/questions/{question}/answer', [SocialController::class, 'storeAnswer'])->name('social.questions.answer');
Route::post('/social/questions/{question}/upvote', [SocialController::class, 'upvoteQuestion'])->name('social.questions.upvote');
Route::post('/social/reviews', [SocialController::class, 'storeReview'])->name('social.reviews.store');

// Module 05 — Inspire (Visual Discovery & Collections) Routes
Route::get('/inspire', [InspireController::class, 'index'])->name('inspire.index');
Route::get('/inspire/{slug}', [InspireController::class, 'show'])->name('ideas.show');
Route::post('/inspire/{gallery}/bookmark', [InspireController::class, 'bookmark'])->name('inspire.bookmark');
