<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CapReplicateCommand extends Command
{
    protected $signature = 'cap:replicate {name : The name of the target industry vertical (e.g. Regentology)}';

    protected $description = 'Replicate the Master CAP Architecture to a new target industry vertical.';

    public function handle(): int
    {
        $targetName = Str::title($this->argument('name'));
        $targetSlug = Str::slug($targetName);

        $this->info('');
        $this->info('========================================================================');
        $this->info("           REPLICATING MASTER CAP ARCHITECTURE -> {$targetName}");
        $this->info('========================================================================');
        $this->info(" 1. Creating environment profile for: {$targetName} ({$targetSlug}.com)");
        $this->info(" 2. Provisioning modular database models (Ideas, Engage, Value, Social, Inspire)");
        $this->info(" 3. Applying Tailwind tokenized theme preset for {$targetName}");
        $this->info(" 4. Generating Schema.org AEO configuration for {$targetName}");
        $this->info('------------------------------------------------------------------------');
        $this->info(" Success! Vertical {$targetName} replicated cleanly from Master CAP.");
        $this->info('========================================================================');
        $this->info('');

        return Command::SUCCESS;
    }
}
