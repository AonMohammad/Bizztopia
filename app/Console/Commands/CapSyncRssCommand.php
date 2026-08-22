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

        $stats = $rssService->ingestAllFeeds();

        $this->info("RSS Sync Complete!");
        $this->info("Feeds Processed: {$stats['processed']}");
        $this->info("New Articles Ingested: {$stats['new']}");

        return Command::SUCCESS;
    }
}
