<?php

namespace App\Console\Commands;

use App\Modules\Attract\Models\Article;
use App\Modules\Attract\Services\ArticleRewriterService;
use Illuminate\Console\Command;

class CapRewriteArticlesCommand extends Command
{
    protected $signature = 'cap:rewrite-articles {--limit=50 : Maximum number of articles to rewrite} {--all : Rewrite all articles}';

    protected $description = 'Rewrite short snippet articles into full, long-form structured B2B editorial articles.';

    public function handle(ArticleRewriterService $rewriter): int
    {
        $this->info('Starting Article Rewriter Pipeline...');

        $limit = (int) $this->option('limit');
        $rewriteAll = (bool) $this->option('all');

        $query = Article::with('category');
        if (!$rewriteAll) {
            // Find articles with short content (< 800 chars)
            $query->whereRaw('length(content) < 800');
        }

        $articles = $query->take($limit)->get();

        if ($articles->isEmpty()) {
            $this->info('No short articles found requiring rewriting.');
            return Command::SUCCESS;
        }

        $this->info("Found {$articles->count()} articles to process. Rewriting into structured long-form content...");

        $bar = $this->output->createProgressBar($articles->count());
        $bar->start();

        $rewrittenCount = 0;
        foreach ($articles as $article) {
            $categoryName = $article->category?->name ?? 'Business';
            $subSlug = $article->category?->slug ?? 'general';

            $rewritten = $rewriter->rewrite(
                $article->title,
                $article->content,
                $categoryName,
                $subSlug
            );

            $article->update([
                'subtitle' => $rewritten['subtitle'],
                'content' => $rewritten['content'],
                'reading_time' => $rewritten['reading_time'],
                'seo_description' => \Illuminate\Support\Str::limit(strip_tags($rewritten['subtitle']), 160),
            ]);

            $rewrittenCount++;
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Successfully rewritten {$rewrittenCount} articles into comprehensive editorial B2B guides.");

        return Command::SUCCESS;
    }
}
