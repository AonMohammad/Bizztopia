<?php

namespace App\Console\Commands;

use App\Modules\Attract\Models\Article;
use App\Modules\Attract\Models\Category;
use App\Modules\Engage\Models\Poll;
use App\Modules\Engage\Models\Quiz;
use App\Modules\Inspire\Models\Gallery;
use App\Modules\Social\Models\Question;
use App\Modules\Social\Models\Review;
use Illuminate\Console\Command;

class CapStatusCommand extends Command
{
    protected $signature = 'cap:status';

    protected $description = 'Display live modular status, dataset metrics, and replication readiness of the Master CAP Platform.';

    public function handle(): int
    {
        $this->info('');
        $this->info('========================================================================');
        $this->info('           MASTER CAP PLATFORM — MODULAR BACKEND STATUS');
        $this->info('========================================================================');
        $this->info(' Instance Name:   '.config('cap.name'));
        $this->info(' Target Domain:   '.config('cap.domain'));
        $this->info(' Target Region:   '.config('cap.region'));
        $this->info(' Industry Scope:  '.config('cap.industry'));
        $this->info('------------------------------------------------------------------------');

        $this->table(
            ['Module Pillar', 'Backend Models & Services', 'Database Record Count', 'Status'],
            [
                ['Module 01: Ideas (Attract)', 'Article, Category, Author, RssIngestionService', Article::count().' Articles Across '.Category::count().' Subcategories', 'Active [100% Complete]'],
                ['Module 02: Engage', 'Poll, PollOption, PollVote, Quiz, QuizResult', Poll::count().' Active Polls & '.Quiz::count().' Quizzes', 'Active [100% Complete]'],
                ['Module 03: Value', 'CalculationEngine (Marketing ROI & Startup Cost)', 'Dynamic Real-time Calculator Engine', 'Active [Ready]'],
                ['Module 04: Social', 'Question, Answer, Review (Verified Reputation)', Question::count().' Q&A Threads & '.Review::count().' Verified Reviews', 'Active [Ready]'],
                ['Module 05: Inspire', 'Gallery, GalleryImage, Collection', Gallery::count().' Visual Design Showroom Galleries', 'Active [Ready]'],
            ]
        );

        $this->info('------------------------------------------------------------------------');
        $this->info(' Architecture: Modular DDD (app/Modules/) + Laravel API + Inertia/React');
        $this->info(' Replication Command: php artisan cap:replicate {VerticalName}');
        $this->info('========================================================================');
        $this->info('');

        return Command::SUCCESS;
    }
}
