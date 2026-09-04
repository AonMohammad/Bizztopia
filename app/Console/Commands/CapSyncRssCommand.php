<?php

namespace App\Console\Commands;

use App\Modules\Attract\Services\RssIngestionService;
use Illuminate\Console\Command;

class CapSyncRssCommand extends Command
{
    protected $signature = 'cap:sync-rss';

    protected $description = 'Ingest and classify latest North American business RSS feeds into the Ideas module.';

    public function handle(RssIngestionService $rssService): int
    {
        $this->info('Starting RSS feed synchronization across North American sources...');
        $this->info('Daily Ingestion Cap Rule: Max 50 total articles overall per day.');

        $newCount = $rssService->syncFeeds();
        $totalFeeds = count($rssService->getConfiguredFeeds());

        if ($newCount === 0) {
            $this->warn('RSS Sync complete — total daily limit of 50 articles overall already reached for today.');
        } else {
            $this->info("RSS Sync Complete!");
            $this->info("Feeds Processed: {$totalFeeds}");
            $this->info("New Articles Ingested Today: {$newCount} / 50 overall max");
        }

        return Command::SUCCESS;
    }
}
