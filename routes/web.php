<?php

use App\Http\Controllers\AdminController;
use App\Modules\Attract\Controllers\AuthorController;
use App\Modules\Attract\Controllers\IdeasController;
use App\Modules\Attract\Models\Article;
use App\Modules\Attract\Models\Category;
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
    if (!$featuredArticle) {
        $featuredArticle = (object)[
            'id' => 1,
            'title' => 'How to Scale Your B2B SaaS Startup in 2026: The Ultimate Playbook',
            'slug' => 'how-to-scale-b2b-saas-startup-2026',
            'subtitle' => 'Unlocking key metrics, growth methodologies, and product marketing models to double customer acquisition velocity.',
            'category' => (object)['name' => 'SaaS Platforms', 'slug' => 'saas'],
            'author' => (object)['name' => 'Sarah Jenkins', 'role_title' => 'Growth Architect'],
            'reading_time' => 8
        ];
    }

    $activePoll = Poll::with('options')->where('status', 'active')->latest()->first();
    if (!$activePoll) {
        $activePoll = (object)[
            'id' => 1,
            'title' => 'Which B2B marketing channels drive the highest quality leads in your pipeline?',
            'description' => 'Help us identify current ecosystem trends by voting on your top performing organic or paid growth channels.',
            'category' => 'Marketing',
            'total_votes' => 384,
            'has_voted' => false,
            'options' => [
                (object)['id' => 1, 'option_text' => 'LinkedIn Organic & Cold Outreach', 'votes_count' => 142],
                (object)['id' => 2, 'option_text' => 'Google Search Ads & SEO Content', 'votes_count' => 118],
                (object)['id' => 3, 'option_text' => 'Niche Newsletter Sponsorships', 'votes_count' => 84],
                (object)['id' => 4, 'option_text' => 'Interactive Webinars & Virtual Events', 'votes_count' => 40],
            ]
        ];
    }

    $activeQuiz = Quiz::with(['questions.options', 'results'])->where('status', 'active')->latest()->first();
    $latestQuestion = Question::withCount('answers')->where('status', 'published')->latest()->first();
    if (!$latestQuestion) {
        $latestQuestion = (object)[
            'id' => 1,
            'title' => 'How should we structure equity compensation for our first B2B growth marketing hire?',
            'slug' => 'structure-equity-compensation-b2b-marketing-hire',
            'body' => 'We are preparing to bring on our first head of growth. We have a seed valuation of $5M. Looking for industry standard ranges.',
            'category' => 'Consulting',
            'author_name' => 'David Miller',
            'author_role' => 'Founder, ScaleFlow',
            'upvotes_count' => 18,
            'answers_count' => 4,
            'is_solved' => true
        ];
    }

    $reviews = Review::where('status', 'approved')->latest()->take(9)->get();
    $featuredGallery = Gallery::where('status', 'published')->latest()->first();
    
    $allLatest = Article::with(['category', 'author'])->latest()->take(20)->get();

    $breakingArticles = $allLatest->slice(0, 10)->map(function ($art) {
        $art->image_url = $art->hero_image ?: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&q=80';
        return $art;
    })->values();

    $trendingArticles = $allLatest->slice(10, 10)->map(function ($art) {
        $art->image_url = $art->hero_image ?: 'https://images.unsplash.com/photo-1551836022-b06985bceb24?auto=format&fit=crop&w=300&q=80';
        return $art;
    })->values();

    $defaultRoi = $calcEngine->calculateRoi(2500, 45, 8, 1200);

    $topCategories = Category::whereNotNull('image_url')->get(['id', 'name', 'slug', 'color', 'image_url']);

    return Inertia::render('Welcome', [
        'featuredArticle' => $featuredArticle,
        'activePoll' => $activePoll,
        'activeQuiz' => $activeQuiz,
        'latestQuestion' => $latestQuestion,
        'reviews' => $reviews,
        'featuredGallery' => $featuredGallery,
        'initialRoi' => $defaultRoi,
        'breakingArticles' => $breakingArticles,
        'trendingArticles' => $trendingArticles,
        'topCategories' => $topCategories,
    ]);
});

// Master CAP Admin Authentication & Lockdown Routes
Route::get('/admin/login', [AdminController::class, 'loginForm'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.submit');
Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

// Master CAP Admin Backend Portal (Protected & Locked by AdminAuthMiddleware)
Route::middleware([\App\Http\Middleware\AdminAuthMiddleware::class])->group(function () {
    Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);

    // Admin Feeds & Rewriter Triggers
    Route::post('/admin/sync-rss', [AdminController::class, 'syncRss'])->name('admin.sync-rss');
    Route::post('/admin/rewrite-articles', [AdminController::class, 'rewriteArticles'])->name('admin.rewrite-articles');

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
});

// Module 01 — Ideas (Attract Knowledge Hub) Routes
Route::get('/ideas', [IdeasController::class, 'index'])->name('ideas.index');
Route::get('/ideas/category/{slug}', [IdeasController::class, 'category'])->name('ideas.category');
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
Route::get('/inspire/{slug}', [InspireController::class, 'show'])->name('inspire.show');
Route::post('/inspire/{gallery}/bookmark', [InspireController::class, 'bookmark'])->name('inspire.bookmark');

// Newsletter subscription route
use App\Modules\Attract\Models\NewsletterSubscriber;
use Illuminate\Http\Request;

Route::post('/newsletter/subscribe', function (Request $request) {
    $request->validate([
        'email' => 'required|email|unique:newsletter_subscribers,email',
    ], [
        'email.unique' => 'This email is already subscribed to Bizztopia Digest!',
        'email.email' => 'Please enter a valid email address.',
    ]);

    NewsletterSubscriber::create([
        'email' => $request->input('email'),
        'ip_address' => $request->ip(),
    ]);

    return back()->with('success', 'Thank you for subscribing to the Bizztopia Intelligence Digest!');
})->name('newsletter.subscribe');

// Yelp Subcategory Landing Page Route
Route::get('/subcategory/{slug}', function ($slug) {
    $mapping = [
        'takeout' => ['name' => 'Takeout', 'category' => 'Restaurants'],
        'delivery' => ['name' => 'Delivery', 'category' => 'Restaurants'],
        'hot-trendy' => ['name' => 'Hot & Trendy', 'category' => 'Restaurants'],
        'new-restaurants' => ['name' => 'New Restaurants', 'category' => 'Restaurants'],
        'breakfast-brunch' => ['name' => 'Breakfast & Brunch', 'category' => 'Restaurants'],
        'lunch' => ['name' => 'Lunch', 'category' => 'Restaurants'],
        'dinner' => ['name' => 'Dinner', 'category' => 'Restaurants'],
        'coffee-cafes' => ['name' => 'Coffee & Cafes', 'category' => 'Restaurants'],
        'pizza' => ['name' => 'Pizza', 'category' => 'Restaurants'],
        'chinese' => ['name' => 'Chinese', 'category' => 'Restaurants'],
        'mexican' => ['name' => 'Mexican', 'category' => 'Restaurants'],
        'bakeries' => ['name' => 'Bakeries', 'category' => 'Restaurants'],
        'italian' => ['name' => 'Italian', 'category' => 'Restaurants'],
        'food-trucks' => ['name' => 'Food Trucks', 'category' => 'Restaurants'],
        'sports-bars-pubs' => ['name' => 'Sports Bars & Pubs', 'category' => 'Restaurants'],
        
        'contractors-handymen' => ['name' => 'Contractors & Handymen', 'category' => 'Home & Garden'],
        'plumbers' => ['name' => 'Plumbers', 'category' => 'Home & Garden'],
        'electricians' => ['name' => 'Electricians', 'category' => 'Home & Garden'],
        'hvac' => ['name' => 'Heating & Air Conditioning', 'category' => 'Home & Garden'],
        'appliances-repair' => ['name' => 'Appliances and Repair', 'category' => 'Home & Garden'],
        'roofing' => ['name' => 'Roofing', 'category' => 'Home & Garden'],
        'locksmiths' => ['name' => 'Locksmiths', 'category' => 'Home & Garden'],
        'painters' => ['name' => 'Painters', 'category' => 'Home & Garden'],
        'landscaping' => ['name' => 'Landscaping', 'category' => 'Home & Garden'],
        'nurseries-gardening' => ['name' => 'Nurseries & Gardening', 'category' => 'Home & Garden'],
        'florists' => ['name' => 'Florists', 'category' => 'Home & Garden'],
        'tree-services' => ['name' => 'Tree Services', 'category' => 'Home & Garden'],
        'home-cleaning' => ['name' => 'Home Cleaning', 'category' => 'Home & Garden'],
        'furniture-stores' => ['name' => 'Furniture Stores', 'category' => 'Home & Garden'],
        'movers' => ['name' => 'Movers', 'category' => 'Home & Garden'],
        
        'auto-repair' => ['name' => 'Auto Repair', 'category' => 'Auto Services'],
        'body-shops' => ['name' => 'Body Shops', 'category' => 'Auto Services'],
        'oil-change' => ['name' => 'Oil Change', 'category' => 'Auto Services'],
        'tires' => ['name' => 'Tires', 'category' => 'Auto Services'],
        'towing' => ['name' => 'Towing', 'category' => 'Auto Services'],
        'car-wash' => ['name' => 'Car Wash', 'category' => 'Auto Services'],
        'auto-detailing' => ['name' => 'Auto Detailing', 'category' => 'Auto Services'],
        'parking' => ['name' => 'Parking', 'category' => 'Auto Services'],
        'car-dealers' => ['name' => 'Car Dealers', 'category' => 'Auto Services'],
        'junkyards' => ['name' => 'Junkyards', 'category' => 'Auto Services'],
        
        'dentists' => ['name' => 'Dentists', 'category' => 'Health & Beauty'],
        'doctors' => ['name' => 'Doctors', 'category' => 'Health & Beauty'],
        'chiropractors' => ['name' => 'Chiropractors', 'category' => 'Health & Beauty'],
        'optometrists' => ['name' => 'Optometrists', 'category' => 'Health & Beauty'],
        'dermatologists' => ['name' => 'Dermatologists', 'category' => 'Health & Beauty'],
        'podiatrists' => ['name' => 'Podiatrists', 'category' => 'Health & Beauty'],
        'massage' => ['name' => 'Massage', 'category' => 'Health & Beauty'],
        'hair-salons' => ['name' => 'Hair Salons', 'category' => 'Health & Beauty'],
        'nail-salons' => ['name' => 'Nail Salons', 'category' => 'Health & Beauty'],
        'barbers' => ['name' => 'Barbers', 'category' => 'Health & Beauty'],
        'spas' => ['name' => 'Spas', 'category' => 'Health & Beauty'],
        'physical-therapy' => ['name' => 'Physical Therapy', 'category' => 'Health & Beauty'],
        
        'things-to-do' => ['name' => 'Things to Do', 'category' => 'Travel & Activities'],
        'kids-activities-camps' => ['name' => 'Kids Activities & Camps', 'category' => 'Travel & Activities'],
        'venues-events' => ['name' => 'Venues & Events', 'category' => 'Travel & Activities'],
        'churches' => ['name' => 'Churches', 'category' => 'Travel & Activities'],
        'shopping-malls' => ['name' => 'Shopping Malls', 'category' => 'Travel & Activities'],
        'bookstores' => ['name' => 'Bookstores', 'category' => 'Travel & Activities'],
        'mini-golf' => ['name' => 'Mini Golf', 'category' => 'Travel & Activities'],
        'bowling' => ['name' => 'Bowling', 'category' => 'Travel & Activities'],
        'hotels' => ['name' => 'Hotels', 'category' => 'Travel & Activities'],
        'taxis' => ['name' => 'Taxis', 'category' => 'Travel & Activities'],
        'bike-rentals' => ['name' => 'Bike Rentals', 'category' => 'Travel & Activities'],
        'campgrounds' => ['name' => 'Campgrounds', 'category' => 'Travel & Activities'],
        'beaches' => ['name' => 'Beaches', 'category' => 'Travel & Activities'],
        'swimming-pools' => ['name' => 'Swimming Pools', 'category' => 'Travel & Activities'],
        'bars-nightlife' => ['name' => 'Bars & Nightlife', 'category' => 'Travel & Activities'],
        
        'dry-cleaning' => ['name' => 'Dry Cleaning', 'category' => 'More'],
        'laundromats' => ['name' => 'Laundromats', 'category' => 'More'],
        'thrift-stores' => ['name' => 'Thrift Stores', 'category' => 'More'],
        'tailors-alterations' => ['name' => 'Tailors & Alterations', 'category' => 'More'],
        'apartments' => ['name' => 'Apartments', 'category' => 'More'],
        'junk-removal' => ['name' => 'Junk Removal', 'category' => 'More'],
        'gyms' => ['name' => 'Gyms', 'category' => 'More'],
        'yoga-pilates' => ['name' => 'Yoga & Pilates', 'category' => 'More'],
    ];

    $info = $mapping[$slug] ?? ['name' => ucfirst(str_replace('-', ' ', $slug)), 'category' => 'Directory'];

    // Query 3 relevant news articles for this subcategory
    $parentCategoryName = $info['category'];
    $category = \App\Modules\Attract\Models\Category::where('name', $parentCategoryName)->first();
    
    $subName = str_replace('-', ' ', $slug);
    $articles = \App\Modules\Attract\Models\Article::where('source_rss_name', 'LIKE', '%' . $subName . '%')
        ->orWhere('title', 'LIKE', '%' . $subName . '%')
        ->latest('published_at')
        ->limit(3)
        ->get();

    if ($articles->count() < 3 && $category) {
        $existingIds = $articles->pluck('id')->toArray();
        $fallbackArticles = \App\Modules\Attract\Models\Article::where('category_id', $category->id)
            ->whereNotIn('id', $existingIds)
            ->latest('published_at')
            ->limit(3 - $articles->count())
            ->get();
        $articles = $articles->concat($fallbackArticles);
    }

    return Inertia::render('SubcategoryLanding', [
        'slug' => $slug,
        'name' => $info['name'],
        'categoryName' => $info['category'],
        'articles' => $articles
    ]);
})->name('subcategory.show');

// Write a Review Page Route
Route::get('/write-a-review', function () {
    return Inertia::render('Review/WriteReview');
})->name('reviews.write');

// Bizztopia for Consumers Routes
Route::get('/for-consumers', function () {
    return Inertia::render('Consumer/Index');
})->name('consumer.index');

Route::get('/consumers', function () {
    return redirect('/for-consumers');
});

// Authentication Routes
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

// Company & Informational Static Pages
Route::get('/about', function () {
    return Inertia::render('Static/About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Static/Contact');
})->name('contact');

Route::get('/how-it-works', function () {
    return Inertia::render('Static/HowItWorks');
})->name('how-it-works');

Route::get('/careers', function () {
    return Inertia::render('Static/Careers');
})->name('careers');

Route::get('/press', function () {
    return Inertia::render('Static/Press');
})->name('press');

Route::get('/privacy', function () {
    return Inertia::render('Static/Privacy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('Static/Terms');
})->name('terms');

Route::get('/trust-safety', function () {
    return Inertia::render('Static/TrustSafety');
})->name('trust-safety');

Route::get('/cookies', function () {
    return redirect('/privacy#cookies');
});

Route::get('/accessibility', function () {
    return redirect('/terms#accessibility');
});

Route::get('/glossary', function () {
    return redirect('/ideas');
});

// XML Sitemap Endpoint
Route::get('/sitemap.xml', function () {
    $baseUrl = url('/');
    $lastMod = date('Y-m-d');

    $staticRoutes = [
        '/' => ['priority' => '1.0', 'changefreq' => 'daily'],
        '/for-consumers' => ['priority' => '0.9', 'changefreq' => 'daily'],
        '/value' => ['priority' => '0.9', 'changefreq' => 'daily'],
        '/ideas' => ['priority' => '0.9', 'changefreq' => 'daily'],
        '/social' => ['priority' => '0.8', 'changefreq' => 'daily'],
        '/inspire' => ['priority' => '0.8', 'changefreq' => 'daily'],
        '/write-a-review' => ['priority' => '0.8', 'changefreq' => 'weekly'],
        '/about' => ['priority' => '0.7', 'changefreq' => 'monthly'],
        '/how-it-works' => ['priority' => '0.7', 'changefreq' => 'monthly'],
        '/careers' => ['priority' => '0.6', 'changefreq' => 'monthly'],
        '/press' => ['priority' => '0.6', 'changefreq' => 'monthly'],
        '/contact' => ['priority' => '0.6', 'changefreq' => 'monthly'],
        '/trust-safety' => ['priority' => '0.6', 'changefreq' => 'monthly'],
        '/privacy' => ['priority' => '0.5', 'changefreq' => 'monthly'],
        '/terms' => ['priority' => '0.5', 'changefreq' => 'monthly'],
    ];

    $subcategories = [
        'takeout', 'delivery', 'coffee-cafes', 'burgers', 'pizza', 'bakeries',
        'contractors-handymen', 'electricians', 'home-cleaners', 'hvac', 'landscaping', 'locksmiths', 'movers', 'painters', 'plumbers', 'roofers',
        'auto-repair', 'auto-detailing', 'body-shops', 'car-wash', 'oil-change', 'tires-wheels', 'towing',
        'dentists', 'gyms-fitness', 'massage', 'hair-salons', 'spas', 'physical-therapy',
        'venues-events', 'hotels', 'bars-nightlife', 'dry-cleaning', 'junk-removal'
    ];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    foreach ($staticRoutes as $path => $meta) {
        $xml .= '  <url>' . "\n";
        $xml .= '    <loc>' . htmlspecialchars($baseUrl . $path) . '</loc>' . "\n";
        $xml .= '    <lastmod>' . $lastMod . '</lastmod>' . "\n";
        $xml .= '    <changefreq>' . $meta['changefreq'] . '</changefreq>' . "\n";
        $xml .= '    <priority>' . $meta['priority'] . '</priority>' . "\n";
        $xml .= '  </url>' . "\n";
    }

    foreach ($subcategories as $slug) {
        $xml .= '  <url>' . "\n";
        $xml .= '    <loc>' . htmlspecialchars($baseUrl . '/subcategory/' . $slug) . '</loc>' . "\n";
        $xml .= '    <lastmod>' . $lastMod . '</lastmod>' . "\n";
        $xml .= '    <changefreq>daily</changefreq>' . "\n";
        $xml .= '    <priority>0.8</priority>' . "\n";
        $xml .= '  </url>' . "\n";
    }

    // Dynamic Categories
    $categories = \App\Modules\Attract\Models\Category::all();
    foreach ($categories as $cat) {
        $xml .= '  <url>' . "\n";
        $xml .= '    <loc>' . htmlspecialchars($baseUrl . '/ideas/category/' . $cat->slug) . '</loc>' . "\n";
        $xml .= '    <lastmod>' . $lastMod . '</lastmod>' . "\n";
        $xml .= '    <changefreq>daily</changefreq>' . "\n";
        $xml .= '    <priority>0.85</priority>' . "\n";
        $xml .= '  </url>' . "\n";
    }

    // Dynamic Published Articles (All 524+)
    $articles = \App\Modules\Attract\Models\Article::where('status', 'published')
        ->select(['slug', 'updated_at', 'published_at'])
        ->latest('published_at')
        ->get();

    foreach ($articles as $art) {
        $artDate = $art->published_at ? date('Y-m-d', strtotime($art->published_at)) : $lastMod;
        $xml .= '  <url>' . "\n";
        $xml .= '    <loc>' . htmlspecialchars($baseUrl . '/ideas/' . $art->slug) . '</loc>' . "\n";
        $xml .= '    <lastmod>' . $artDate . '</lastmod>' . "\n";
        $xml .= '    <changefreq>weekly</changefreq>' . "\n";
        $xml .= '    <priority>0.75</priority>' . "\n";
        $xml .= '  </url>' . "\n";
    }

    $xml .= '</urlset>';

    return response($xml, 200)->header('Content-Type', 'application/xml');
})->name('sitemap.xml');

// Dynamic Robots.txt Route
Route::get('/robots.txt', function () {
    $robots = "User-agent: *\n";
    $robots .= "Allow: /\n";
    $robots .= "Disallow: /admin/\n";
    $robots .= "Disallow: /admin\n";
    $robots .= "Sitemap: https://bizztopia.net/sitemap.xml\n";
    return response($robots, 200)->header('Content-Type', 'text/plain');
});

// Form Submission Endpoints — Persists 100% of User Form Submissions to SQLite DB
use App\Http\Controllers\FormSubmissionController;

Route::post('/leads/submit', [FormSubmissionController::class, 'submitLead'])->name('leads.submit');
Route::post('/contact/submit', [FormSubmissionController::class, 'submitContact'])->name('contact.submit');
Route::post('/claims/submit', [FormSubmissionController::class, 'submitClaim'])->name('claims.submit');
Route::post('/reviews/submit', [FormSubmissionController::class, 'submitReview'])->name('reviews.submit');



